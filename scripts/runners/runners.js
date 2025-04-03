const typeLabel = "type=";
const fs = require("fs");
const projectsLabel = "projects=";
const projectsPath = "./projects";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    executeScript(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        type: getType(argsObj),
        args: argsObj,
        projects: getProjectList(argsObj)
    };
}

const getType = (argsObj) => {
    const typeList = argsObj.filter(arg => arg.includes(typeLabel));

    if (typeList.length < 1) {
        console.error('Argument type is missing!');
        process.exit(1);
    }

    return typeList[0].replace(typeLabel, "");
}

const getProjectList = (argsObj) => {
    const projectList = argsObj.filter(arg => arg.includes(projectsLabel));

    if (projectList.length >= 1) {
        return projectList[0].replace(projectsLabel, "").split(",");
    }

    return getDirectories();
}

const getDirectories = () => fs.readdirSync(projectsPath).filter(file => fs.statSync(projectsPath + '/' + file).isDirectory() && !file.includes("demo-"));

const executeScript = (argsObj) => {
    const selectedType = getSelectedTypeObj(argsObj);
    const scriptExecute = require(`${selectedType.basePath}${selectedType.script}`);

    argsObj.projects.forEach(project => {
        argsObj.project = project;
        scriptExecute.execute(argsObj);
    })
}

const getSelectedTypeObj = (argsObj) => {
    const scriptSettings = require('./settings.json');
    const selectedTypeList = scriptSettings.types.filter(types => types.type === argsObj.type);

    if (selectedTypeList.length < 1) {
        console.error('Type is not defined in the settings.json.');
        process.exit(1);
    }

    return selectedTypeList[0];
}

module.exports.execute = execute;
