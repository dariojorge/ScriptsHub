const fs = require("fs");
const execSync = require('child_process').execSync;
const { getArgValue } = require("./../../utils/utils");
const demoTypeLabel = "demoType";
const versionLabel = "version";
const demoPath = "./demo/{demoType}";
const pomLabel = "demo-java-version";
const baseJavaVersion = 17;

const execute = (args) => {
    console.log("Start Demo setup");
    const argsObj = buildArgsObj(args);

    if (!validateDemoType(argsObj)) {
        console.error("End Demo setup as the validation failed.");
        return;
    }

    copyDemoProjectToDestiny(argsObj);
    changePomJavaVersion(argsObj);
    runTheMvnCmd(argsObj);
    console.log("End Demo setup.");
};

const buildArgsObj = (argsObj) => {
    return {
        demoType: getArgValue(argsObj.args, demoTypeLabel),
        version: getVersion(argsObj.args)
    };
}

getVersion = (args) => {
    const javaVersion = getArgValue(args, versionLabel);

    if (javaVersion === undefined) {
        console.error("Using the default version:" + baseJavaVersion);
        return baseJavaVersion;
    }

    if (parseInt(javaVersion) < baseJavaVersion) {
        console.error("The java version has to be 17+");
        process.exit(1);
    }

    return javaVersion;
}

const validateDemoType = (argsObj) => fs.existsSync(demoPath.replace("{demoType}", argsObj.demoType));

const copyDemoProjectToDestiny = (argsObj) => {
    const from = demoPath.replace("{demoType}", argsObj.demoType);
    const to = "../";

    execSync(`cp -r ${from} ${to}`);
}

changePomJavaVersion = (argsObj) => {
    const basePath = "../" + argsObj.demoType;
    const pomPath = basePath + "/pom.xml";

    let pomData = fs.readFileSync(pomPath, 'utf8');
    if (!pomData.includes(pomLabel)) {
        return;
    }

    const replaceFrom = new RegExp(`${pomLabel}`, 'gi');
    const replaceTo = argsObj.version;

    pomData = pomData.replace(replaceFrom, replaceTo);
    fs.writeFileSync(pomPath, pomData, 'utf8');
}

const runTheMvnCmd = (argsObj) => {
    execSync(`cd .. &&  cd ${argsObj.demoType} && mvn clean install`);
}

module.exports.execute = execute;