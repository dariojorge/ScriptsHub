const { isListEmpty } = require("../../../utils/utils");

const execute = (args) => {
    const argsObj = buildArgsObj(args);

    const envVarsList = [];
    argsObj.additionalScripts.forEach(additionalScript => {
        processScripts(additionalScript, argsObj, envVarsList);
    });

    return envVarsList;
};

const buildArgsObj = (argsObj) => {
    return {
        envs: argsObj.envData.envs,
        additionalScripts: argsObj.envData.additionalScripts,
        additionalData: argsObj.envData.additionalData,
        envSelected: argsObj.envSelected
    };
}

const processScripts = (additionalScript, argsObj, envVarsList) => {
    const executeList = executeAdditionalScript(argsObj, additionalScript);
    if (isListEmpty(executeList)) {
        return;
    }
    envVarsList.push(...executeList);
}

const executeAdditionalScript = (argsObj, additionalScript) => {
    if (isListEmpty(additionalScript.envVars)) {
        return [];
    }

    const scriptExecute = require(additionalScript.script);
    return scriptExecute.execute(argsObj);
}

module.exports.execute = execute;