const execSync = require('child_process').execSync;
const portLabel = "port=";

const execute = (argsObj) => {
    const argsObj = buildArgsObj(args);
    const pid = getPid(argsObj);

    killProcess(pid);
};

const buildArgsObj = (argsObj) => {
    return {
        port: getPort(argsObj.args)
    };
}

const getPort = (args) => {
    const portList = args.filter(arg => arg.includes(portLabel))

    if (portList.length < 1) {
        console.error("Missing env argument.");
        return undefined;
    }

    return portList[0].replace(portLabel, "");
}

const getPid = (argsObj) => {
    const port = argsObj.port;
    const netStatData = getNetStatData();
    const regexPort = getRegex(`${port}.*`);
    const dataFilteredList = netStatData.toString("utf8").match(regexPort);

    if (dataFilteredList === null || dataFilteredList.length < 1) {
        console.error("There was no port found, this process may not be in use anymore.");
        process.exit(1);
    }

    const regexCleanAllData = getRegex(`.*LISTENING`);
    const regexCleanSpaces = getRegex(`.*\\s`);
    return dataFilteredList[0].replace(regexCleanAllData, "").replace(regexCleanSpaces, "");
}

const getNetStatData = () => execSync("netstat -a -n -o");

const getRegex = (regex) => new RegExp(regex, 'gi');

const killProcess = (pid) => execSync(`TASKKILL /PID ` + pid + ` /f`);

module.exports.execute = execute;
