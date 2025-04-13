const { execSync } = require("child_process");
const { convertStringToBoolean, getArgValue } = require("../../../utils/utils");
const TYPE = {
    EXECUTE: 'EXECUTE',
    ARG: 'ARG'
};
const options = {
    encoding: "utf8"
};

const execute = (args) => {
    const argsObj = buildArgsObj(args);

    argsObj.additionalCmd.forEach(cmd => {
        processCmd(cmd, argsObj);
    });
};

const buildArgsObj = (argsObj) => {
    return {
        additionalCmd: argsObj.envData.additionalCmd,
        envData: argsObj.envData,
        args: argsObj.args
    };
}

const processCmd = (cmd, argsObj) => {
    switch (cmd.type.toUpperCase()) {
        case TYPE.EXECUTE:
            const conditionBoolean = convertStringToBoolean(cmd.value);
            if (conditionBoolean) {
                console.log(execSync(cmd.cmd, options));
            }
            break;
        case TYPE.ARG:
            const conditionArg = convertStringToBoolean(getArgValue(argsObj.args, cmd.value))
            if (conditionArg) {
                console.log(execSync(cmd.cmd, options));
            }
            break;
        default:
            console.error(`Cmd type: ${cmd.type} is not configured.`);
    }
}

module.exports.execute = execute;