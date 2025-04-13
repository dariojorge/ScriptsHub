const fs = require("fs");
const { getArgValue, isListEmpty } = require("./../../utils/utils");
const scriptNameLabel = "scriptName";
const operationNameLabel = "operationName";
const folderPath = "scripts/{scriptName}";
const templateFolderPath = "scripts/template/operations/templates/scripts";

const options = {
    encoding: "utf8"
};

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    argsObj.folderPath = getFolderPathName(argsObj);

    createScriptFolders(argsObj);
    creatingAllTheDefaultFiles(argsObj);
    getEditSettingsFile(argsObj);
    getEditScriptsSettingsFile(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        type: argsObj.type,
        scriptName: getArgValue(argsObj.args, scriptNameLabel),
        operationName: getArgValue(argsObj.args, operationNameLabel)
    };
}

const getFolderPathName = (argsObj) => folderPath.replace("{scriptName}", argsObj.scriptName);

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

    const data = fs.readFileSync(settingsFilePath, options);
    const jsonData = JSON.parse(data);

    if (!isListEmpty(validateSettingsJsonFile(jsonData, argsObj))) {
        console.error("This script already exists.");
        return;
    }

    const settingsJson = {
        "name": argsObj.scriptName,
        "type": argsObj.scriptName,
        "basePath": `/${argsObj.scriptName}/`,
        "script": `${argsObj.scriptName}.js`
    }
    jsonData.types.push(settingsJson);

    fs.writeFileSync(settingsFilePath, JSON.stringify(jsonData), options);
}

const getEditScriptsSettingsFile = (argsObj) => {
    const settingsFilePath = "/settings.json";
    const scriptsSettingsFilePath = argsObj.folderPath + settingsFilePath;

    const data = fs.readFileSync(scriptsSettingsFilePath, options);
    const jsonData = JSON.parse(data);

    if (!isListEmpty(validateScriptSettingsJsonFile(jsonData, argsObj))) {
        console.error("This operation already exists.");
        return;
    }

    const settingsJson = {
        "name": argsObj.operationName,
        "type": argsObj.operationName,
        "basePath": "./operations/",
        "script": `${argsObj.operationName}.js`
    }
    jsonData.types.push(settingsJson);

    fs.writeFileSync(scriptsSettingsFilePath, JSON.stringify(jsonData), options);
}

const validateSettingsJsonFile = (jsonData, argsObj) => jsonData.types.filter(data => data.type===argsObj.scriptName);
const validateScriptSettingsJsonFile = (jsonData, argsObj) => jsonData.types.filter(data => data.type===argsObj.operationName);

module.exports.execute = execute;
