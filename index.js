let args = process.argv.slice(2);
const { getArgValue, error, getRegex, getElementByType, isEmpty, isListEmpty } = require("./scripts/utils/utils");
const scriptTypeLabel = "scriptType";
const scriptPath = "./scripts";

const init = () => {
    validateArguments()
    extractTextFromArguments();

    const scriptType = getArgValue(args, scriptTypeLabel);
    if (isEmpty(scriptType)) {
        process.exit(1);
    }

    const settings = getSettings(scriptType);
    const scriptExecute = require(`${scriptPath}${settings.basePath}${settings.script}`);

    removeScriptTypeFromArgs(scriptType);

    scriptExecute.execute(args);
}

const validateArguments = () => {
    if (isListEmpty(args)) {
        error('Expected at least one argument!');
        process.exit(1);
    }
}

const extractTextFromArguments = () => {
    const singleArgs = joinAllArguments();
    const searchForText = getRegex(`(\\w+)=[\"]([^\"]*)[\"]`);
    const searchForOtherArgs = getRegex(`(\\w+)=(\\S+)`);

    const matchedText = singleArgs.match(searchForText);
    const matchedArgs = singleArgs.match(searchForOtherArgs);

    args = [];

    if (matchedText) {
        args.push(...matchedText);
    }

    if (matchedArgs) {
        args.push(...matchedArgs);
    }

}

const joinAllArguments = () => {
    let allArgsIntoText = "";
    args.forEach(data => {
        allArgsIntoText += `${data} `;
    });
    return allArgsIntoText;
}

const getSettings = (scriptType) => {
    const scriptHubSettings = require('./settings.json');
    const selectedScriptList = getElementByType(scriptHubSettings.types, scriptType);
    if (isEmpty(selectedScriptList)) {
        error('Missing settings for this script type.');
        process.exit(1);
    }

    return selectedScriptList;
}

const removeScriptTypeFromArgs = (scriptType) => {
    const index = args.indexOf(scriptTypeLabel + scriptType);
    if (index >= 0) {
        args.splice(index, 1);
    }
}

init();
