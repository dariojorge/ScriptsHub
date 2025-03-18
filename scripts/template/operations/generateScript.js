const fs = require("fs");
const scriptNameLabel = "scriptName=";
const operationNameLabel = "operationName=";
const folderPath = "scripts/{scriptName}";
const templateFolderPath = "scripts/template/operations/templates/scripts";

const execute = (args) => {
    let argsObj = buildArgsObj(args);
    argsObj = getFolderPathName(argsObj);

    createScriptFolders(argsObj);
    creatingAllTheDefaultFiles(argsObj);
    getEditSettingsFile(argsObj);
    getEditScriptsSettingsFile(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        type: argsObj.type,
        scriptName: getScriptName(argsObj.args),
        operationName: getOperationName(argsObj.args)
    };
}

const getScriptName = (args) => {
    const scriptNameList = args.filter(arg => arg.includes(scriptNameLabel))

    if (scriptNameList.length < 1) {
        console.error("Missing env argument.");
        return undefined;
    }

    return scriptNameList[0].replace(scriptNameLabel, "");
}

const getOperationName = (args) => {
    const operationNameList = args.filter(arg => arg.includes(operationNameLabel))

    if (operationNameList.length < 1) {
        console.error("Missing env argument.");
        return undefined;
    }

    return operationNameList[0].replace(operationNameLabel, "");
}

const getFolderPathName = (argsObj) => {
    argsObj.folderPath = folderPath.replace("{scriptName}", argsObj.scriptName);
    return argsObj;
};

const createScriptFolders = (argsObj) => {
    if (fs.existsSync(argsObj.folderPath)) {
        console.error("This script already exists.");
        return;
    }

    fs.mkdirSync(argsObj.folderPath);
    fs.mkdirSync(argsObj.folderPath + "/operations");
};

const creatingAllTheDefaultFiles = (argsObj) => {
    const filePathObj = {
        scriptsFileName: getScriptsFileName(argsObj),
        settingsFileName: getSettingsFileName(argsObj),
        operationFileName: getOperationFileName(argsObj),
        templateScriptJsFilePath: templateFolderPath + "/scriptsTemplate.js",
        templateScriptSettingsFilePath: templateFolderPath + "/settingsTemplate.json",
        templateOperationFilePath: templateFolderPath + "/operationTemplate.js"
    }

    createScriptsFile(filePathObj);
    createSettingsFile(filePathObj);
    createOperationFile(filePathObj);
};

getScriptsFileName = (argsObj) => argsObj.folderPath + "/scriptsTemplate.js".replace("scriptsTemplate", argsObj.scriptName);

getSettingsFileName = (argsObj) => argsObj.folderPath + "/settingsTemplate.json".replace("settingsTemplate", "settings");

getOperationFileName = (argsObj) => argsObj.folderPath + "/operations/operationTemplate.js".replace("operationTemplate", argsObj.operationName);

createScriptsFile = (filePathObj) => {
    if (fs.existsSync(filePathObj.scriptsFileName)) {
        console.error("The file already exists.");
        return;
    }

    fs.copyFileSync(filePathObj.templateScriptJsFilePath, filePathObj.scriptsFileName);
}

createSettingsFile = (filePathObj) => {
    if (fs.existsSync(filePathObj.settingsFileName)) {
        console.error("The file already exists.");
        return;
    }
    fs.copyFileSync(filePathObj.templateScriptSettingsFilePath, filePathObj.settingsFileName);
}

createOperationFile = (filePathObj) => {
    if (fs.existsSync(filePathObj.operationFileName)) {
        console.error("The file already exists.");
        return;
    }
    fs.copyFileSync(filePathObj.templateOperationFilePath, filePathObj.operationFileName);
}

const getEditSettingsFile = (argsObj) => {
    const settingsFilePath = "settings.json";

    const data = fs.readFileSync(settingsFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    if (!validateSettingsJsonFile(jsonData, argsObj).length < 1) {
        console.error("This script already exists.");
        return;
    }

    const settingsJson = {
        "type": argsObj.scriptName,
        "script": "/" + argsObj.scriptName + "/" + argsObj.scriptName + ".js"
    }
    jsonData.types.push(settingsJson);

    fs.writeFileSync(settingsFilePath, JSON.stringify(jsonData), 'utf8');
}

const getEditScriptsSettingsFile = (argsObj) => {
    const settingsFilePath = "/settings.json";
    const scriptsSettingsFilePath = argsObj.folderPath + settingsFilePath;

    const data = fs.readFileSync(scriptsSettingsFilePath, 'utf8');
    const jsonData = JSON.parse(data);

    if (!validateScriptSettingsJsonFile(jsonData, argsObj).length < 1) {
        console.error("This operation already exists.");
        return;
    }

    const settingsJson = {
        "type": argsObj.operationName,
        "script": "./operations/" + argsObj.operationName + ".js"
    }
    jsonData.types.push(settingsJson);

    fs.writeFileSync(scriptsSettingsFilePath, JSON.stringify(jsonData), 'utf8');
}

const validateSettingsJsonFile = (jsonData, argsObj) => jsonData.types.filter(data => data.type===argsObj.scriptName);
const validateScriptSettingsJsonFile = (jsonData, argsObj) => jsonData.types.filter(data => data.type===argsObj.operationName);

module.exports.execute = execute;
