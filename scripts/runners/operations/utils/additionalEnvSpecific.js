const { getElementByType, getFilteredElement } = require("../../../utils/utils");
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
    const list = getElementByType(argsObj.additionalData, "WORKING_ENV");
    if(list === undefined) {
        return [];
    }

    return list.envs;
}

module.exports.execute = execute;