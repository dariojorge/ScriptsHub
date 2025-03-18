const fs = require("fs");
const createFilesLabel="createFiles=";
let runnersPathFrom="projects/{project}/runners";
let runnersPathTo="../{project}/.idea/runConfigurations";

const execute = (args) => {
    console.log('Starting process for the project: ' + args.project);
    const argsObj = buildArgsObj(args);

    runnersPathFrom=runnersPathFrom.replace("{project}", argsObj.project);
    runnersPathTo=runnersPathTo.replace("{project}", argsObj.project);
    validateDestinationPath(runnersPathTo);

    const fileData = {
        fromListOfFiles: getFiles(runnersPathFrom),
        fromFolderPath: runnersPathFrom,
        toListOfFiles: getFiles(runnersPathTo),
        toFolderPath: runnersPathTo,
        createFiles: argsObj.createFiles
    }
    copyFiles(fileData);
};

const buildArgsObj = (argsObj) => {
    return {
        createFiles: getCreateFile(argsObj.args),
        project: argsObj.project
    };
}

const getCreateFile = (args) => {
    let createFilesArgList = args.filter(arg => arg.includes(createFilesLabel));

    if(createFilesArgList < 1) {
        console.error("No createFiles setUp using the default value.");
        return false;
    }

    const createFilesArg = createFilesArgList[0].replace(createFilesLabel, "");
    return String(createFilesArg).toLowerCase() === "true";
}

const copyFiles = (fileData) => {
    let fileList = fileData.fromListOfFiles;
    if(!fileData.createFiles) {
        fileData.toListOfFiles.forEach(toFile => {
            toFile=toFile.replace(".run", "");
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

const getFiles = (path) => fs.readdirSync(path).filter(file => fs.statSync(path + '/' + file).isFile());

const validateDestinationPath = (dir) => !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;

module.exports.execute = execute;
