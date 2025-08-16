const fs = require("fs");
const { validateDestinationPath, validateDestinationPathNoCreation, getFiles, getArgValue, convertStringToBoolean, log, error, warning } = require("../../utils/utils");
const recreateFilesLabel = "recreateFiles";
let projectInternalPath = "projects/{project}";
let runnersLabel = `runners`;
let projectExternalPath = "../{project}";
let ideaPath = "/.idea";
const runConfigurationsPath = "/runConfigurations";

const execute = (args) => {
    log('Starting process for the project: ' + args.project);
    const argsObj = buildArgsObj(args);

    const projectsPath = projectInternalPath.replace("{project}", argsObj.project);
    const modifiedProjectPath = projectExternalPath.replace("{project}", argsObj.project);

    if (!validateDestinationPathNoCreation(projectsPath)) {
        error(`Project ${argsObj.project} does not exist in the folder projects.`);
        return;
    }

    if (!validateDestinationPathNoCreation(modifiedProjectPath)) {
        error(`Project ${argsObj.project} does not exist`);
        return;
    }

    const modifiedRunnersPathFrom = `${projectsPath}/${runnersLabel}`;
    const runnersPath = modifiedProjectPath + ideaPath + runConfigurationsPath;
    validateDestinationPath(modifiedProjectPath + ideaPath);
    validateDestinationPath(runnersPath);

    const fileData = {
        fromListOfFiles: getFiles(modifiedRunnersPathFrom),
        fromFolderPath: modifiedRunnersPathFrom,
        toListOfFiles: getFiles(runnersPath),
        toFolderPath: runnersPath,
        recreateFiles: argsObj.recreateFiles || true
    }
    copyFiles(fileData);
};

const buildArgsObj = (argsObj) => {
    return {
        recreateFiles: convertStringToBoolean(getArgValue(argsObj.args, recreateFilesLabel)),
        project: argsObj.project
    };
}

const copyFiles = (fileData) => {
    let fileList = fileData.fromListOfFiles;

    if(fileList === undefined) {
        warning(`No runner folder present.`);
        return;
    }

    if (!fileData.recreateFiles) {
        fileData.toListOfFiles.forEach(toFile => {
            toFile = toFile.replace(".run", "");
            const index = fileList.indexOf(toFile);
            if (index > -1) {
                fileList.splice(index, 1);
            }
        });
    }

    let valueCount = 0;
    fileList.forEach(file => {
        const from = `${fileData.fromFolderPath}/${file}`;
        const to = `${fileData.toFolderPath}/${file.replace(".xml", ".run.xml")}`;

        fs.copyFileSync(from, to);
        valueCount++;
    });
    log(`Files created where: ${valueCount}`);
}

module.exports.execute = execute;