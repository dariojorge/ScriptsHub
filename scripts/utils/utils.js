const fs = require("fs");

// LOGS
const log = (message) => console.log(message);
const warning = (message) => console.warn(message);
const error = (message) => console.error(message);
module.exports.log = log;
module.exports.warning = warning;
module.exports.error = error;

//VALIDATIONS
module.exports.isEmpty = (value) => value == null || value.length === 0;
module.exports.isBlank = (value) => (!value || /^\s*$/.test(value));

//LIST VALIDATIONS
const firstElement = (list) => list.length > 0 ? list[0] : null;
const isListEmpty = (list) => !list || list.length <= 0;
module.exports.firstElement = firstElement;
module.exports.isListEmpty = isListEmpty;

module.exports.getElementByType = (list, elementName) => isListEmpty(list) ? undefined : firstElement(list.filter(element => element.type === elementName));
module.exports.getElementByKey = (list, elementName) => isListEmpty(list) ? undefined : firstElement(list.filter(element => element.key === elementName));
module.exports.getFilteredElement = (list, filter) => firstElement(list.filter(filter));

//
module.exports.convertStringToBoolean = (stringValue) => String(stringValue).toLowerCase() === "true";
module.exports.getArgValue = (args, argLabel) => {
    const argLabelModified = `${argLabel}=`;
    const argList = args.filter(arg => arg.includes(argLabelModified))

    if (isListEmpty(argList)) {
        error(`Missing argument ${argLabel}.`);
        return undefined;
    }

    return firstElement(argList).replace(argLabelModified, "");
}
module.exports.createFoldersIfMissing = (dir) => {
    try {
      fs.mkdirSync(dir, { recursive: true });
      log('Directories created successfully');
    } catch (err) {
      error('Error creating directories:', err);
    }
}
module.exports.validateDestinationPath = (dir) => !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
module.exports.validateDestinationPathNoCreation = (dir) => fs.existsSync(dir);
module.exports.getFiles = (path) => {
    if (!fs.existsSync(path)) {
        return;
    }

    return fs.readdirSync(path).filter(file => fs.statSync(path + '/' + file).isFile());
};

module.exports.getRegex = (regex) => new RegExp(regex, 'gi');
module.exports.getOptions = { encoding: "utf8" };

module.exports.getSelectedType = (argsObj, scriptSettings) => {
    const selectedTypeList = scriptSettings.types.filter(types => types.type === argsObj.type);

    if (isListEmpty(selectedTypeList)) {
        error('Type is not defined in the settings.json.');
        process.exit(1);
    }

    return firstElement(selectedTypeList);
};