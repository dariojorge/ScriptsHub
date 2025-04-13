const execSync = require('child_process').execSync;
const { getArgValue, isListEmpty, firstElement } = require("./../../utils/utils");
const portLabel = "port";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    const pid = getPid(argsObj);

    killProcess(pid);
};

const buildArgsObj = (argsObj) => {
    return {
        port: getArgValue(argsObj.args, portLabel)
    };
}

const getPid = (argsObj) => {
    const port = argsObj.port;
    const netStatData = getNetStatData();
    const regexPort = getRegex(`${port}.*`);
    const dataFiltered = netStatData.toString("utf8").match(regexPort);

    if (isListEmpty(dataFiltered)) {
        console.error("There was no port found, this process may not be in use anymore.");
        process.exit(1);
    }

    const regexCleanAllData = getRegex(`.*LISTENING`);
    const regexCleanSpaces = getRegex(`.*\\s`);

    return firstElement(dataFiltered).replace(regexCleanAllData, "").replace(regexCleanSpaces, "");
}

const getNetStatData = () => execSync("netstat -a -n -o");

const getRegex = (regex) => new RegExp(regex, 'gi');

const killProcess = (pid) => execSync(`TASKKILL /PID ` + pid + ` /f`);

module.exports.execute = execute;
