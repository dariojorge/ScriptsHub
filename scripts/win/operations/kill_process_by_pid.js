const execSync = require('child_process').execSync;
const portLabel = "port=";

let execute = (argsObj) => {
    const port = argsObj.args.filter(arg => arg.includes(portLabel))[0]
    const pid = getPid(port.replace(portLabel, ""));
    killProcess(pid);
};

getRegex = (regex) => {
    return new RegExp(regex, 'gi');
}

getNetStatData = () => {
    return execSync("netstat -a -n -o");
}

getPid = (port) => {
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

killProcess = (pid) => {
    return execSync(`TASKKILL /PID ` + pid + ` /f`);
}


module.exports.execute = execute;
