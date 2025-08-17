const execSync = require('child_process').execSync;
const path = require('path');
const { getArgValue, isListEmpty, firstElement, error, getRegex, convertStringToBoolean } = require("./../../utils/utils");
const withUpdateLabel = "checkUpdate";
const electronPath = path.join(__dirname, "electron-app");

const execute = (args) => {
    const argsObj = buildArgsObj(args);

    if(argsObj.checkUpdate) {
        checkUpdateAndStartElectron();
        return;
    }

    startElectron();
};

const buildArgsObj = (argsObj) => {
    return {
        checkUpdate: convertStringToBoolean(getArgValue(argsObj.args, withUpdateLabel)) || false
    };
}

const startElectron = () => execSync(`cd ${electronPath} && npm run dev:electron`);

const checkUpdateAndStartElectron = () => {

    return execSync(`cd ${electronPath} && npm run build && npm run dev:electron`);
};

module.exports.execute = execute;
