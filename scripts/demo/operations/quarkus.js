const fs = require("fs");
const execSync = require('child_process').execSync;
const demoTypeLabel = "demoType=";
const demoPath = "./demo/{demoType}";

const execute = (args) => {
    console.log("Start Demo setup");
    const argsObj = buildArgsObj(args);
    copyDemoProjectToDestiny(argsObj);
    runTheMvnCmd(argsObj);
    console.log("End Demo setup");
};

const buildArgsObj = (argsObj) => {
    return {
        demoType: getDemoType(argsObj.args)
    };
}

getDemoType = (args) => {
    const demoTypeList = args.filter(arg => arg.includes(demoTypeLabel))

    if (demoTypeList.length < 1) {
        console.error("Missing env argument.");
        return undefined;
    }

    return demoTypeList[0].replace(demoTypeLabel, "");
}

const validateDemoType = (argsObj) => fs.existsSync(demoPath.replace("{demoType}", argsObj.demoType));

const copyDemoProjectToDestiny = (argsObj) => {
    if (!validateDemoType(argsObj)) {
        return;
    }
    const from = demoPath.replace("{demoType}", argsObj.demoType);
    const to = "../";

    execSync(`cp -r ${from} ${to}`);
}

const runTheMvnCmd = (argsObj) => {
    execSync(`cd .. &&  cd ${argsObj.demoType} && mvn clean install`);
}

module.exports.execute = execute;