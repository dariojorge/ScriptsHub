const { getArgValue, isListEmpty, firstElement, getSelectedType } = require("./../utils/utils");
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
    const scriptSettings = require('./settings.json');
    const selectedType = getSelectedType(argsObj, scriptSettings);
    const scriptExecute = require(`${selectedType.basePath}${selectedType.script}`);

    scriptExecute.execute(argsObj);
}

module.exports.execute = execute;
