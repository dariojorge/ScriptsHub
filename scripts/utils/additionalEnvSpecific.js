const { getElementByType } = require("./utils");
const execute = (args) => {
    const argsObj = buildArgsObj(args);

    const list = [];
    if(argsObj.workingEnvs.includes(argsObj.envSelected)) {
        argsObj.additionalEnvs.forEach(element => {
            list.push(element);
        });
    }
    
    return list;
};

const buildArgsObj = (argsObj) => {
    return {
        additionalEnvs: getAdditionalEnvs(argsObj),
        workingEnvs: getWorkingEnvs(argsObj),
        envSelected: argsObj.envSelected
    };
}

const getAdditionalEnvs = (argsObj) => {
    const list = getElementByType(argsObj.additionalEnvs, argsObj.selectedAdditionalEnv);
    if(list === undefined) {
        return [];
    }

    return list.env;
}

const getWorkingEnvs = (argsObj) => {
    const list = getElementByType(argsObj.additionalData, "WORKING_ENV");
    if(list === undefined) {
        return [];
    }

    return list.envs;
}

module.exports.execute = execute;