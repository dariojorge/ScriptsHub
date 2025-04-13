const { execSync } = require("child_process");
const { firstElement, isListEmpty } = require("../../../utils/utils");
const TYPE = {
    EXECUTE: 'EXECUTE',
    READ: 'READ'
};

const execute = (args) => {
    const argsObj = buildArgsObj(args);

    const envVarsList = [];
    argsObj.additionalEnvs.forEach(scripts => {
        processScripts(scripts, argsObj, envVarsList);
    });

    return envVarsList;
};

const buildArgsObj = (argsObj) => {
    return {
        additionalEnvs: argsObj.envData.additionalEnvs,
        additionalData: argsObj.envData.additionalData,
        selectedAdditionalEnv: argsObj.selectedAdditionalEnv,
        envSelected: argsObj.envSelected
    };
}

const processScripts = (additionalEnv, argsObj, envVarsList) => {
    switch (additionalEnv.type.toUpperCase()) {
        case TYPE.READ:
            const readList = readAdditionalScript(additionalEnv);
            if (isListEmpty(readList)) {
                break;
            }
            envVarsList.push(...readList);
            break;
        case TYPE.EXECUTE:
            argsObj.selectedAdditionalEnv = additionalEnv.type;
            const executeList = executeAdditionalScript(argsObj, additionalEnv);

            if (isListEmpty(executeList)) {
                break;
            }

            envVarsList.push(...executeList);
            break;
        default:
            console.error(`Execute type: ${additionalEnv.type} is not configured.`);
    }
}

const readAdditionalScript = (additionalEnv) => {
    if (isListEmpty(additionalEnv.env)) {
        return [];
    }

    const filePath = additionalEnv.filePath;
    const env = additionalEnv.env;
    const envVarsList = [];
    const filerData = execSync("cat " + filePath);

    env.forEach(envObj => {
        const regexSearch = additionalEnv.regexSearch.replace("{ORIGIN}", envObj.origin);
        const regexReplace = additionalEnv.regexReplace.replace("{ORIGIN}", envObj.origin);
        const replaceFrom = new RegExp(regexSearch, 'gi');
        const cleanFrom = new RegExp(regexReplace, 'gi');

        const envVarObj = {
            key: envObj.key,
            value: firstElement(filerData.toString("utf8").match(replaceFrom)).replace(cleanFrom, "")
        };
        envVarsList.push(envVarObj);
    });

    return envVarsList;
}

const executeAdditionalScript = (argsObj, additionalEnv) => {
    if (isListEmpty(additionalEnv.env)) {
        return [];
    }

    const scriptExecute = require(additionalEnv.filePath);
    return scriptExecute.execute(argsObj);
}

module.exports.execute = execute;