const execSync = require('child_process').execSync;
const { getArgValue } = require("./../../utils/utils");
const numberOfCommitsLabel = "numberOfCommits";
const newCommitTextLabel = "newCommitText";
const projectPathLabel = "projectPath";

const execute = (args) => {
    const argsObj = buildArgsObj(args);
    gitResetNumber(argsObj);
};

const buildArgsObj = (argsObj) => {
    return {
        numberOfCommits: getArgValue(argsObj.args, numberOfCommitsLabel),
        newCommitText: getArgValue(argsObj.args, newCommitTextLabel).replaceAll("\"", ""),
        projectPath: getArgValue(argsObj.args, projectPathLabel).replaceAll("\"", "")
    };
}

const gitResetNumber = (argsObj) => {

    execSync(`git -C ${argsObj.projectPath} reset HEAD~${argsObj.numberOfCommits}`);
    execSync(`git -C ${argsObj.projectPath} add .`);
    execSync(`git -C ${argsObj.projectPath} commit -m "${argsObj.newCommitText}"`);
    execSync(`git -C ${argsObj.projectPath} push --force`);
}

module.exports.execute = execute;
