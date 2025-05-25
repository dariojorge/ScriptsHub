const fs = require("fs");
const execSync = require('child_process').execSync;
const { getArgValue, log, error } = require("./../../utils/utils");
const demoTypeLabel = "demoType";
const demoPath = "./demo/{demoType}";

const execute = (args) => {
    log("Start Demo setup");
    const argsObj = buildArgsObj(args);

    if (!validateDemoType(argsObj)) {
        error("End Demo setup as the validation failed.");
        return;
    }

    copyDemoProjectToDestiny(argsObj);
    runTheNpmCmd(argsObj);
    log("End Demo setup.");
};

const buildArgsObj = (argsObj) => {
    return {
        demoType: getArgValue(argsObj.args, demoTypeLabel)
    };
}

const validateDemoType = (argsObj) => fs.existsSync(demoPath.replace("{demoType}", argsObj.demoType));

const copyDemoProjectToDestiny = (argsObj) => {
    const from = demoPath.replace("{demoType}", argsObj.demoType);
    const to = "../";

    execSync(`cp -r ${from} ${to}`);
}

const runTheNpmCmd = (argsObj) => {
    execSync(`cd .. &&  cd ${argsObj.demoType} && npm install`);
}

module.exports.execute = execute;