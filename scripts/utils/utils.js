const fs = require("fs");

const firstElement = (list) => list.length > 0 ? list[0] : null;
const isListEmpty = (list) => !list || list.length <= 0 ? true : false;

module.exports.firstElement = firstElement;
module.exports.isListEmpty = isListEmpty;
module.exports.convertStringToBoolean = (stringValue) => String(stringValue).toLowerCase() === "true";
module.exports.getArgValue = (args, argLabel) => {
    const argLabelModified = `${argLabel}=`;
    const argList = args.filter(arg => arg.includes(argLabelModified))

    if (isListEmpty(argList)) {
        console.error(`Missing argument ${argLabel}.`);
        return undefined;
    }

    return firstElement(argList).replace(argLabelModified, "");
}
module.exports.validateDestinationPath = (dir) => !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
module.exports.validateDestinationPathNoCreation = (dir) => fs.existsSync(dir);
module.exports.getFiles = (path) => {
    if (!fs.existsSync(path)) {
        return;
    }

    return fs.readdirSync(path).filter(file => fs.statSync(path + '/' + file).isFile());
};
module.exports.getElementByType = (list, elementName) => isListEmpty(list) ? undefined : firstElement(list.filter(element => element.type === elementName));
module.exports.isBlank = (value) => (!value || /^\s*$/.test(value));