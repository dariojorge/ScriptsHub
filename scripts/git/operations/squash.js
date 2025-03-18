const execSync = require('child_process').execSync;
const numberOfCommitsLabel = "numberOfCommits=";
const newCommitTextLabel = "newCommitText=";
const projectPathLabel = "projectPath=";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    gitResetNumber(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        numberOfCommits: getNumberOfCommits(argsObj.args),
        newCommitText: getNewCommitText(argsObj.args),
        projectPath: getProjectPath(argsObj.args)
    };
}

const getNumberOfCommits = (args) => {
    const numberOfCommitsList = args.filter(arg => arg.includes(numberOfCommitsLabel));

    if (numberOfCommitsList.length < 1) {
        console.error('Argument type numberOfCommits is missing!');
        return;
    }

    return numberOfCommitsList[0].replace(numberOfCommitsLabel, "");
}

const getNewCommitText = (argsObj) => {
    const newCommitTextList = argsObj.filter(arg => arg.includes(newCommitTextLabel));

    if (newCommitTextList.length < 1) {
        console.error('Argument type newCommitText is missing!');
        return;
    }

    return newCommitTextList[0].replace(newCommitTextLabel, "").replaceAll("\"", "");
}

const getProjectPath = (argsObj) => {
    const projectPathList = argsObj.filter(arg => arg.includes(projectPathLabel));

    if (projectPathList.length < 1) {
        console.error('Argument type projectPath is missing!');
        return;
    }

    return projectPathList[0].replace(projectPathLabel, "").replaceAll("\"", "");
}

const gitResetNumber = (argsObj) => {
    execSync(`git -C ${argsObj.projectPath} reset HEAD~${argsObj.numberOfCommits}`);
    execSync(`git -C ${argsObj.projectPath} add .`);
    execSync(`git -C ${argsObj.projectPath} commit -m "${argsObj.newCommitText}"`);
    execSync(`git -C ${argsObj.projectPath} push --force`);
}

module.exports.execute = execute;
