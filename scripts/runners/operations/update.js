const fs = require("fs");
const { firstElement, getArgValue, getFiles, isListEmpty } = require("../../utils/utils");
const runConfigurationsPath = "../{project}/.idea/runConfigurations/";
const runConfigurationsPathWithFile = "../{project}/.idea/runConfigurations/{file}";
const projectsPath = "../../../projects/{project}/{envJson}";
const envLabel = "env";
const envJsonPath = "envs.json";
const additionalCmdPath = "./utils/additionalCmd";
const additionalScriptsPath = "./utils/additionalScripts";

const options = {
    encoding: "utf8"
};

const execute = (args) => {
    console.log('Starting process for the project: ' + args.project);
    const argsObj = buildArgsObj(args);
    if (argsObj.envData === undefined) {
        return;
    }

    executeAdditionalCmd(argsObj);
    executeAdditionalScripts(argsObj);

    const runnerList = getFiles(runConfigurationsPath.replace("{project}", argsObj.project));
    if (runnerList === undefined) {
        console.error("Missing Runner list from project: " + argsObj.project);
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

    const additionalScripts = argsObj.envData.additionalEnvs;
    if (!isListEmpty(additionalScripts)) {
        const scriptExecute = require(additionalScriptsPath);
        envVarsList = scriptExecute.execute(argsObj);
    }

    const envData = argsObj.envData;
    const envList = envData.envs.env;
    envList.push(...envVarsList);

    return envVarsList;
}

const getReplace = (type) => type === "update";

const getEnvData = (argsObj) => {
    const envSelected = getArgValue(argsObj.args, envLabel);
    const envFile = getEnvFile(argsObj.project);

    if (isListEmpty(envFile.envs)) {
        console.error("Missing or empty envs.json");
        return undefined;
    }

    const envs = firstElement(envFile.envs.filter(env => env.type === envSelected));
    return {
        envs: envs,
        additionalEnvs: filterAdditionalEnvs(envFile.additionalEnvs, envs),
        additionalCmd: envFile.additionalCmd,
        additionalData: envFile.additionalData
    }
}

const filterAdditionalEnvs = (additionalEnvs, envs) => {
    if (!additionalEnvs) {
        return [];
    }

    additionalEnvs = additionalEnvs.map(additionalEnv => {
        return {
            type: additionalEnv.type,
            filePath: additionalEnv.filePath,
            regexSearch: additionalEnv.regexSearch,
            regexReplace: additionalEnv.regexReplace,
            env: filterEnv(additionalEnv, envs)
        };
    });

    return additionalEnvs;
}


const filterEnv = (additionalEnv, envs) => {
    return additionalEnv.env.filter(additionalEnv => !envs.env.find(env => env.key === additionalEnv.key));
};

const getEnvFile = (project) => require(projectsPath.replace("{project}", project).replace("{envJson}", envJsonPath));

const getXmlAndReplace = (file, argsObj) => {
    const filePath = runConfigurationsPathWithFile.replace("{project}", argsObj.project).replace("{file}", file);
    const envData = argsObj.envData;
    const envList = envData.envs.env;

    let fileData = fs.readFileSync(filePath, options);

    envList.forEach(env => {
        if (!fileData.includes(env.key)) {
            return;
        }

        const replaceFrom = new RegExp(`=\"${env.key}\" value=\".*\"`, 'gi');
        const replaceTo = "=\"" + env.key + "\" value=\"" + env.value + "\"";

        fileData = fileData.replace(replaceFrom, replaceTo);

        if (!argsObj.replace) {
            console.log(replaceTo.replace("=", ""));
        }
    });

    if (!argsObj.replace) {
        return;
    }

    fs.writeFileSync(filePath, fileData, options);
}

module.exports.execute = execute;
