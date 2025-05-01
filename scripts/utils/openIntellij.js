const {execSync} = require("child_process");
const { getArgValue, isListEmpty } = require("./utils");
const projectLabel="project";
let args = process.argv.slice(2);

const execute = () => {
    const project = getArgValue(args, projectLabel);
    if(isListEmpty(project)) {
        process.exit(1);
    }

    console.log("project: ");
    console.log(project);

    console.log(execSync(`idea.cmd ../${project}`).toString("utf8"));
}

execute();