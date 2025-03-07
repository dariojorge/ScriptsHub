const fs = require("fs");
const runConfigurationsPath = "../{project}/.idea/runConfigurations/";
const runConfigurationsPathWithFile = "../{project}/.idea/runConfigurations/{file}";
const projectsPath = "../../../projects/{project}/{envJson}";
const envLabel = "env=";
const envJsonPath = "envs.json";

const execute = (args) => {
    console.log('Starting process for the project: ' + args.project);
    const argsObj = buildArgsObj(args);
    if (argsObj.envData === undefined) {
        return;
    }

    const runnerList = getFiles(runConfigurationsPath.replace("{project}", argsObj.project));
    if(runnerList === undefined) {
        console.error("Missing Runner list from project: " + argsObj.project);
        return;
    }

    runnerList.forEach(file => {
        getXmlAndReplace(file, argsObj);
    });
};

const buildArgsObj = (argsObj) => {
    return {
        replace: getReplace(argsObj.type),
        envData: getEnvData(argsObj),
        project: argsObj.project
    };
}

const getReplace = (type) => type === "update";

const getEnvData = (argsObj) => {
    const envSelected = getEnv(argsObj);
    const envFile = getEnvFile(argsObj.project);

    if(envFile.envs === undefined || envFile.envs.length < 1) {
        console.error("Missing or empty envs.json");
        return undefined;
    }

    return envFile.envs.filter(env => env.type === envSelected)[0];
}

const getEnv = (argsObj) => {
    const envList = argsObj.args.filter(arg => arg.includes(envLabel))

    if (envList.length < 1) {
        console.error("Missing env argument.");
        return undefined;
    }

    return envList[0].replace(envLabel, "");
}

const getEnvFile = (project) => require(projectsPath.replace("{project}", project).replace("{envJson}", envJsonPath));

const getFiles = (path) => {
    if(!fs.existsSync(path)) {
        return;
    }

   return fs.readdirSync(path).filter(file => fs.statSync(path + '/' + file).isFile());
};

const getXmlAndReplace = (file, argsObj) => {
    const filePath = runConfigurationsPathWithFile.replace("{project}", argsObj.project).replace("{file}", file);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.error(err);
        }

        argsObj.envData.env.forEach(env => {
            if (!data.includes(env.key)) {
                return;
            }

            const replaceFrom = new RegExp(`=\"${env.key}\" value=\".*\"`, 'gi');
            const replaceTo = "=\"" + env.key + "\" value=\"" + env.value + "\"";

            data = data.replace(replaceFrom, replaceTo);

            if (!argsObj.replace) {
                console.log(replaceTo.replace("=", ""));
            }
        });

        if (!argsObj.replace) {
            return;
        }

        fs.writeFile(filePath, data, 'utf8', (err) => {
            if (err) return console.error(err);
        });
    });
}

module.exports.execute = execute;
