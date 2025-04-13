let args = process.argv.slice(2);
const { firstElement, getArgValue, isListEmpty } = require("./scripts/utils/utils");
const scriptTypeLabel="scriptType";
const scriptPath="./scripts";

const init = () => {
    if (args === 0) {
        console.error('Expected at least one argument!');
        process.exit(1);
    }

    extractTextFromArguments();

    const scriptType = getArgValue(args, scriptTypeLabel);
    if(scriptType===undefined) {
        process.exit(1);
    }

    const settings = getSettings(scriptType);
    const scriptExecute = require(`${scriptPath}${settings.basePath}${settings.script}`);

    removeScriptTypeFromArgs(scriptType);

    scriptExecute.execute(args);
}

const extractTextFromArguments = () => {
    const singleArgs = joinAllArguments();
    const searchForText = new RegExp(`(\\w+)=[\"]([^\"]*)[\"]`, 'gi');
    const searchForOtherArgs = new RegExp(`(\\w+)=(\\S+)`, 'gi');

    const matchedText = singleArgs.match(searchForText);
    const matchedArgs = singleArgs.match(searchForOtherArgs);

    args = [];

    if(matchedText) {
        args.push(...matchedText);
    }

    if(matchedArgs) {
        args.push(...matchedArgs);
    }

}

const joinAllArguments = () => {
    let allArgsIntoText = "";
    args.forEach(data => {
        allArgsIntoText += data + " ";
    });
    return allArgsIntoText;
}

const getSettings = (scriptType) => {
    const scriptHubSettings = require('./settings.json');
    const selectedScriptList=scriptHubSettings.types.filter(types => types.type===scriptType);
    if (isListEmpty(selectedScriptList.length)) {
        console.error('Missing settings for this script type.');
        process.exit(1);
    }

    return firstElement(selectedScriptList);
}

const removeScriptTypeFromArgs = (scriptType) => {
    const index = args.indexOf(scriptTypeLabel + scriptType);
    if (index >= 0) {
        args.splice(index, 1);
    }
}

init();
