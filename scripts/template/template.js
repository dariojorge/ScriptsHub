const fs = require("fs");
const typeLabel = "type=";

const execute = (args) => {
    const argsObj = buildArgsObj(args);

};

const buildArgsObj = (argsObj) => {
    return {
        type: getType(argsObj)
    };
}

module.exports.execute = execute;

const getType = (args) => {
    const typeList = args.filter(arg => arg.includes(typeLabel));

    if (typeList.length >= 1) {
        return typeList[0].replace(typeLabel, "");
    } else {
        console.error('Argument type is missing!');
        process.exit(1);
    }
}
