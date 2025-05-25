const fs = require("fs");
const { firstElement, getArgValue, getFiles, isListEmpty, getElementByKey, isBlank, log, error, getOptions, getRegex, isEmpty } = require("../../utils/utils");
const runConfigurationsPath = "../{project}/.idea/runConfigurations/";
const runConfigurationsPathWithFile = "../{project}/.idea/runConfigurations/{file}";
const projectsPath = "../../../projects/{project}/{envJson}";
const envLabel = "env";
const envJsonPath = "envs.json";
const additionalCmdPath = "./utils/additionalCmd";
const additionalScriptsPath = "./utils/additionalScripts";

const execute = (args) => {
    log('Starting process for the project: ' + args.project);
    const argsObj = buildArgsObj(args);
    if (isEmpty(argsObj.envData)) {
        return;
    }

    executeAdditionalCmd(argsObj);
    argsObj.finalList = executeAdditionalScripts(argsObj);
    const runnerList = getFiles(runConfigurationsPath.replace("{project}", argsObj.project));
    if (isListEmpty(runnerList)) {
        error("Missing Runner list from project: " + argsObj.project);
        return;
    }

    runnerList.forEach(file => {
        getXmlAndReplace(file, argsObj);
    });
};

const buildArgsObj = (argsObj) => {
    return {
        replace: getReplace(argsObj.type),
        envData: getEnvData(argsObj),
        project: argsObj.project,
        envSelected: getArgValue(argsObj.args, envLabel),
        args: argsObj.args
    };
}

const executeAdditionalCmd = (argsObj) => {
    const additionalCmd = argsObj.envData.additionalCmd;
    if (!isListEmpty(additionalCmd)) {
        const scriptExecute = require(additionalCmdPath);
        scriptExecute.execute(argsObj);
    }
}

const executeAdditionalScripts = (argsObj) => {
    let envVarsList = [];
    const additionalScripts = argsObj.envData.additionalScripts;
    if (!isListEmpty(additionalScripts)) {
        const scriptExecute = require(additionalScriptsPath);
        envVarsList = scriptExecute.execute(argsObj);
    }
    const envData = argsObj.envData;
    const envVars = envData.envs?.envVars;
    return addOrReplaceEnvironmentVariables(envVars, envVarsList);
}

const addOrReplaceEnvironmentVariables = (envVars = [], envVarsList) => {
    if (isListEmpty(envVarsList)) {
        return envVars;
    }

    return [...envVars, ...envVarsList].filter(env => {
        const elem = getElementByKey(envVars, env.key);
        if (!isBlank(elem) && elem.value !== env.value) {
            return false;
        }

        return true;
    });
}

const getReplace = (type) => type === "update";

const getEnvData = (argsObj) => {
    const envSelected = getArgValue(argsObj.args, envLabel);
    const envFile = getEnvFile(argsObj.project);

    if (isListEmpty(envFile.envs)) {
        error("Missing or empty envs.json");
        return undefined;
    }

    const envs = firstElement(envFile.envs.filter(env => env.type === envSelected));
    return {
        envs: envs,
        additionalScripts: filterAdditionalScripts(envFile.additionalScripts, envs),
        additionalCmd: envFile.additionalCmd,
        additionalData: envFile.additionalData
    }
}

const filterAdditionalScripts = (additionalScripts, envs) => {
    if (!additionalScripts || !envs) {
        return [];
    }

    additionalScripts = additionalScripts.map(additionalScript => {
        additionalScript.envVars = filterEnv(additionalScript, envs);
        return additionalScript;
    });
    return additionalScripts;
}


const filterEnv = (additionalScript, envs) => {
    return additionalScript.envVars.filter(additionalScriptEnvVar => !envs.envVars.find(envVar => envVar.key === additionalScriptEnvVar.key));
};

const getEnvFile = (project) => require(projectsPath.replace("{project}", project).replace("{envJson}", envJsonPath));

const getXmlAndReplace = (file, argsObj) => {
    const filePath = runConfigurationsPathWithFile.replace("{project}", argsObj.project).replace("{file}", file);
    const envList = argsObj.finalList;
    let fileData = fs.readFileSync(filePath, getOptions);

    envList.forEach(env => {
        if (!fileData.includes(env.key)) {
            return;
        }

        const replaceFrom = getRegex(`=\"${env.key}\" value=\".*\"`);
        const replaceTo = `=\"${env.key}\" value=\"${env.value}\"`;

        fileData = fileData.replace(replaceFrom, replaceTo);

        if (!argsObj.replace) {
            log(replaceTo.replace("=", ""));
        }
    });

    if (!argsObj.replace) {
        return;
    }

    fs.writeFileSync(filePath, fileData, getOptions);
}

module.exports.execute = execute;