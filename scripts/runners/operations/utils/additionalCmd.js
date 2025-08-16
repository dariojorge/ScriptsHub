const { execSync } = require("child_process");
const { convertStringToBoolean, getArgValue, log, error } = require("../../../utils/utils");
const PROJECT_LABEL = "projectLabel";
const projectsLabel = "projects";
const TYPE = {
    EXECUTE: 'EXECUTE',
    ARG: 'ARG'
};
const options = {
    encoding: "utf8"
};

const execute = (args) => {
    const argsObj = buildArgsObj(args);

    argsObj.additionalCmd.forEach(cmdObj => {
        processCmd(cmdObj, argsObj);
    });
};

const buildArgsObj = (argsObj) => {
    return {
        additionalCmd: argsObj.envData.additionalCmd,
        envData: argsObj.envData,
        args: argsObj.args,
        project: getArgValue(argsObj.args, projectsLabel)
    };
}

const processCmd = (cmdObj, argsObj) => {
    switch (cmdObj.type.toUpperCase()) {
        case TYPE.EXECUTE:
            const conditionBoolean = convertStringToBoolean(cmdObj.value);
            executeCmd(conditionBoolean, argsObj, cmdObj);
            break;
        case TYPE.ARG:
            const conditionBoolean = convertStringToBoolean(getArgValue(argsObj.args, cmdObj.value))
            executeCmd(conditionBoolean, argsObj, cmdObj);
            break;
        default:
            error(`Cmd type: ${cmdObj.type} is not configured.`);
    }
}

const executeCmd = (condition, argsObj, cmdObj) => {
    if (condition) {
        const cmd = cmdObj.cmd.replace(PROJECT_LABEL, argsObj.project);
        log(execSync(cmd, options));
    }
}

module.exports.execute = execute;