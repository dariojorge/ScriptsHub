const { getElementByType, getFilteredElement, isEmpty } = require("../../../utils/utils");
const additionalName = "envSpecifics";

const execute = (args) => {
    const argsObj = buildArgsObj(args);

    const list = [];
    argsObj.additionalScript.envVars.forEach(element => {
        list.push(element);
    });

    return list;
};

const buildArgsObj = (argsObj) => {
    return {
        additionalScript: getFilteredElement(argsObj.additionalScripts, additionalScript => additionalScript.name === additionalName),
        workingEnvs: getWorkingEnvs(argsObj)
    };
}

const getWorkingEnvs = (argsObj) => {
    const workingEnv = getElementByType(argsObj.additionalData, "WORKING_ENV");
    if(isEmpty(workingEnv)) {
        return [];
    }

    return workingEnv.envVars;
}

module.exports.execute = execute;