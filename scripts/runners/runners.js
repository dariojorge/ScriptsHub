const fs = require("fs");
const { firstElement, getArgValue, isListEmpty } = require("../utils/utils");
const typeLabel = "type";
const projectsLabel = "projects";
const projectsPath = "./projects";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    executeScript(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        type: getArgValue(argsObj, typeLabel),
        args: argsObj,
        projects: getProjectList(argsObj)
    };
}

const getProjectList = (argsObj) => {
    const projectList = getArgValue(argsObj, projectsLabel);

    if (projectList === undefined) {
        return getDirectories();
    }

    return projectList.split(",");
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

    if (isListEmpty(selectedTypeList)) {
        console.error('Type is not defined in the settings.json.');
        process.exit(1);
    }

    return firstElement(selectedTypeList);
}

module.exports.execute = execute;
