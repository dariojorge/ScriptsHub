let args = process.argv.slice(2);
const scriptTypeLabel="scriptType=";
const scriptPath="./scripts";

const init = () => {
    if (args === 0) {
        console.error('Expected at least one argument!');
        process.exit(1);
    }

    extractTextFromArguments();

    const scriptType = getScriptType();
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

const getScriptType = () => {
    const argList = args.filter(arg => arg.includes(scriptTypeLabel));
    if(argList.length < 1) {
        console.error('Missing argument scriptType');
        process.exit(1);
    }

    return argList[0].replace(scriptTypeLabel, "");
}

const getSettings = (scriptType) => {
    const scriptHubSettings = require('./settings.json');
    const selectedScriptList=scriptHubSettings.types.filter(types => types.type===scriptType);
    if (selectedScriptList.length < 1) {
        console.error('Missing settings for this script type.');
        process.exit(1);
    }

    return selectedScriptList[0];
}

const removeScriptTypeFromArgs = (scriptType) => {
    const index = args.indexOf(scriptTypeLabel + scriptType);
    if (index > -1) {
        args.splice(index, 1);
    }
}

init();
