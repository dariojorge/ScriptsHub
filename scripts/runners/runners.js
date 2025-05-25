const fs = require("fs");
const { getArgValue, isEmpty, getSelectedType } = require("../utils/utils");
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

    if (isEmpty(projectList)) {
        return getDirectories();
    }

    return projectList.split(",");
}

const getDirectories = () => fs.readdirSync(projectsPath).filter(file => fs.statSync(projectsPath + '/' + file).isDirectory() && !file.includes("demo-"));

const executeScript = (argsObj) => {
    const scriptSettings = require('./settings.json');
    const selectedType = getSelectedType(argsObj, scriptSettings);
    const scriptExecute = require(`${selectedType.basePath}${selectedType.script}`);

    argsObj.projects.forEach(project => {
        argsObj.project = project;
        scriptExecute.execute(argsObj);
    })
}

module.exports.execute = execute;
