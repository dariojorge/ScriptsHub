const execSync = require('child_process').execSync;
const path = require('path');
const { getArgValue, isListEmpty, firstElement, error, getRegex, convertStringToBoolean, log } = require("./../../utils/utils");
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
    const packageJsonPath = `${electronPath}/package.json`;
    const packageJson = require(packageJsonPath.replaceAll("\/", path.sep));

    const getAppVersion = getRegex(`App version:\\s(\\d+\\.\\d+\\.\\d+)`);
    const appVersion = execSync(`cd ${electronPath} && npm run dev:version`).toString("utf8");
    const appVersionFiltered = appVersion.match(getAppVersion)[0];

    const electronVersion = appVersionFiltered.replace("App version: ", "");
    if(packageJson.version !== electronVersion) {
        log("There is a new version, updating!");
        return execSync(`cd ${electronPath} && npm run build && npm run dev:electron`);
    }

    log("There is no new update.");
    return execSync(`cd ${electronPath} && npm run dev:electron`);
};

module.exports.execute = execute;
