const fs = require("fs");
const { validateDestinationPath, validateDestinationPathNoCreation, getFiles, getArgValue, convertStringToBoolean } = require("../../utils/utils");
const createFilesLabel = "createFiles";
let runnersPathFrom = "projects/{project}/runners";
let projectPath = "../{project}";
let ideaPath = "/.idea";
let runnersPath = "/runConfigurations";

const execute = (args) => {
    console.log('Starting process for the project: ' + args.project);
    const argsObj = buildArgsObj(args);

    const modifiedProjectPath = projectPath.replace("{project}", argsObj.project);
    if(!validateDestinationPathNoCreation(modifiedProjectPath)) {
        console.error(`Project ${argsObj.project} does not exist`);
        return;
    }

    const modifiedRunnersPathFrom = runnersPathFrom.replace("{project}", argsObj.project);
    runnersPath = modifiedProjectPath + ideaPath + runnersPath;
    validateDestinationPath(modifiedProjectPath + ideaPath);
    validateDestinationPath(runnersPath);

    const fileData = {
        fromListOfFiles: getFiles(modifiedRunnersPathFrom),
        fromFolderPath: modifiedRunnersPathFrom,
        toListOfFiles: getFiles(runnersPath),
        toFolderPath: runnersPath,
        createFiles: argsObj.createFiles
    }
    copyFiles(fileData);
};

const buildArgsObj = (argsObj) => {
    return {
        createFiles: convertStringToBoolean(getArgValue(argsObj.args, createFilesLabel)),
        project: argsObj.project
    };
}

const copyFiles = (fileData) => {
    let fileList = fileData.fromListOfFiles;
    if (!fileData.createFiles) {
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
        const from = fileData.fromFolderPath + "/" + file;
        const to = fileData.toFolderPath + "/" + file.replace(".xml", ".run.xml");

        fs.copyFileSync(from, to);
        valueCount++;
    });
    console.log("Files created where: " + valueCount);
}

module.exports.execute = execute;
