const fs = require("fs");
const projectNameLabel = "projectName=";
const techTypeLabel = "techType=";
const projectsFolder = "./projects";
const templateRunnerFolderPath = "scripts/template/operations/templates";
const templateEnvJson = "envsTemplate.json";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    createProjectsFolder();
    createProjectFolder(argsObj);
    createRunnerFolder(argsObj);

    argsObj.templateRunnerFiles = getTemplateRunnerFiles(argsObj);
    argsObj.runnerFiles = getRunnerFiles(argsObj);

    argsObj.projectPath = projectsFolder + "/" + argsObj.projectName;
    argsObj.templatePath = templateRunnerFolderPath + "/runners";

    convertAndCreateEnvFile(argsObj);
    convertAndCreateRunnerFiles(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        projectName: getProjectName(argsObj.args),
        techType: getTechType(argsObj.args)
    };
}

const getProjectName = (args) => {
    const projectNameList = args.filter(arg => arg.includes(projectNameLabel))

    if (projectNameList.length < 1) {
        console.error("Missing env argument.");
        return undefined;
    }

    return projectNameList[0].replace(projectNameLabel, "");
}

const getTechType = (args) => {
    const techTypeList = args.filter(arg => arg.includes(techTypeLabel))

    if (techTypeList.length < 1) {
        console.error("Missing env argument.");
        return undefined;
    }

    return techTypeList[0].replace(techTypeLabel, "");
}

const createProjectsFolder = () => {
    if (fs.existsSync(projectsFolder)) {
        console.error("Folder projects already exists.");
        return;
    }

    fs.mkdirSync(projectsFolder);
}

const createProjectFolder = (argsObj) => {
    const projectFolder = projectsFolder + "/" + argsObj.projectName;
    if (fs.existsSync(projectFolder)) {
        console.error("Folder " + argsObj.projectName + " already exists.");
        return;
    }

    fs.mkdirSync(projectFolder);
}

const createRunnerFolder = (argsObj) => {
    const runnersFolder = projectsFolder + "/" + argsObj.projectName + "/runners";
    if (fs.existsSync(runnersFolder)) {
        console.error("Folder runners already exists.");
        return;
    }

    fs.mkdirSync(runnersFolder);
}

const getTemplateRunnerFiles = (argsObj) => {
    const filePath = templateRunnerFolderPath + "/runners/" + argsObj.techType;
    return fs.readdirSync(filePath).filter(file => fs.statSync(filePath + '/' + file).isFile())
};

const getRunnerFiles = (argsObj) => {
    const filePath = projectsFolder + "/" + argsObj.projectName + "/runners";
    return fs.readdirSync(filePath).filter(file => fs.statSync(filePath + '/' + file).isFile())
};

const convertAndCreateEnvFile = (argsObj) => {
    const isEnvFilePresent = validateEnvFileIsPresent(argsObj.projectPath);
    const isTemplateEnvFilePresent = validateTemplateEnvFileIsPresent(argsObj.templatePath);

    if(!isEnvFilePresent && isTemplateEnvFilePresent) {
       fs.copyFileSync(argsObj.templatePath + "/" + templateEnvJson, argsObj.projectPath + "/envs.json");
    }
}

const validateEnvFileIsPresent = (filePath) => {
    const files = fs.readdirSync(filePath).filter(file => fs.statSync(filePath + '/' + file).isFile());

    if (files.length < 1) {
        console.log("No env file present.");
        return false;
    }

    return files[0].includes("envs.json");
};

const validateTemplateEnvFileIsPresent = (filePath) => {
    const files = fs.readdirSync(filePath).filter(file => fs.statSync(filePath + '/' + file).isFile());

    if (files.length < 1) {
        console.log("No template env file present.");
        return false;
    }

    return files[0].includes(templateEnvJson);
};

const convertAndCreateRunnerFiles = (argsObj) => {
    argsObj.templateRunnerFiles.forEach(file => {
        const index = argsObj.templateRunnerFiles.indexOf(file);
        if (index > -1) {
            const runnerTemplate = argsObj.templateRunnerFiles[index];
            const runner = runnerTemplate.replace("_template", "_" + argsObj.projectName).replaceAll("-", "_");

            if(!validateRunnerFileIsPresent(argsObj.projectPath, runner)) {
                const from = argsObj.templatePath + "/" + argsObj.techType + "/" + runnerTemplate;
                const to = argsObj.projectPath + "/runners/" + runner;
                fs.copyFileSync(from, to);
            }
        }
    });
}

const validateRunnerFileIsPresent = (filePath, runner) => {
    const files = fs.readdirSync(filePath).filter(file => fs.statSync(filePath + '/' + file).isFile());

    if (files.length < 1) {
        console.log("No file present.");
        return false;
    }

    return files[0].includes(runner);
};

module.exports.execute = execute;
