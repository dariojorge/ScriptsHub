const { isListEmpty, firstElement, getArgValue } = require("./../utils/utils");
const typeLabel = "type";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    executeScript(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        type: getArgValue(argsObj, typeLabel),
        args: argsObj
    };
}

const executeScript = (argsObj) => {
    const selectedType=getSelectedType(argsObj);
    const scriptExecute = require(`${selectedType.basePath}${selectedType.script}`);

    scriptExecute.execute(argsObj);
}

const getSelectedType = (argsObj) => {
    const scriptSettings = require('./settings.json');
    const selectedTypeList = scriptSettings.types.filter(types => types.type===argsObj.type);

    if (isListEmpty(selectedTypeList)) {
        console.error('Type is not defined in the settings.json.');
        process.exit(1);
    }

    return firstElement(selectedTypeList);
}

module.exports.execute = execute;
