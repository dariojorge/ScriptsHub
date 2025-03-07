const typeLabel = "type=";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    executeScript(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        type: getType(argsObj),
        args: argsObj
    };
}

const getType = (argsObj) => {
    const typeList = argsObj.filter(arg => arg.includes(typeLabel));

    if (typeList.length < 1) {
        console.error('Argument type is missing!');
        process.exit(1);
    }

    return typeList[0].replace(typeLabel, "");
}

const executeScript = (argsObj) => {
    const selectedType=getSelectedType(argsObj);
    const scriptExecute = require(selectedType.script);
    
    scriptExecute.execute(argsObj);
}

const getSelectedType = (argsObj) => {
    const scriptSettings = require('./settings.json');
    const selectedTypeList = scriptSettings.types.filter(types => types.type===argsObj.type);

    if (selectedTypeList.length < 1) {
        console.error('Type is not defined in the settings.json.');
        process.exit(1);
    }

    return selectedTypeList[0];
}

module.exports.execute = execute;
