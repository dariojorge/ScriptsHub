const {execSync} = require("child_process");
const fs = require("fs");

const statName = "Stat";

const execute = () => {
    const fileNameList = getBundleStatFile("dist");
    execSync(`webpack-bundle-analyzer dist/${firstElement(fileNameList)}`);
}

const getBundleStatFile = (projectPath) => fs.readdirSync(projectPath).filter(file => fs.statSync(projectPath + '/' + file).isFile() && file.includes(statName));
const firstElement = (list) => list.length > 0 ? list[0] : null;
execute();