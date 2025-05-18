const { execSync } = require("child_process");
const { getFilteredElement, firstElement, isListEmpty } = require("../../../utils/utils");
const additionalName = "readEnvScript";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    return readAdditionalScript(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        envs: argsObj.envs,
        additionalScript: getFilteredElement(argsObj.additionalScripts, additionalScript => additionalScript.name === additionalName)
    };
}

const readAdditionalScript = (argsObj) => {
    const additionalScript = argsObj.additionalScript;
    if (isListEmpty(additionalScript.envVars)) {
        return [];
    }

    const filePath = additionalScript.filePath;
    const envVars = additionalScript.envVars;
    const envVarsList = [];
    const filerData = execSync("cat " + filePath);

    envVars.forEach(envObj => {
        const regexSearch = additionalScript.regexSearch.replace("{ORIGIN}", envObj.origin);
        const regexReplace = additionalScript.regexReplace.replace("{ORIGIN}", envObj.origin);
        const replaceFrom = new RegExp(regexSearch, 'gi');
        const cleanFrom = new RegExp(regexReplace, 'gi');
        
        envVarsList.push({
            key: envObj.key,
            value: firstElement(filerData.toString("utf8").match(replaceFrom)).replace(cleanFrom, "")
        });
    });

    return envVarsList;
}

module.exports.execute = execute;