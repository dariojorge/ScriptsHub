const { execSync } = require("child_process");
const options = {
    encoding: "utf8",
    detached: true,
    stdio: "ignore",
    timeout: 1000
};
const cmd = `cd ${__dirname} && docker-compose up`;

const execute = (args) => {
    try {
        execSync(cmd, options);
    } catch (err) {
        console.error("Closing this instance.");
    }
};

module.exports.execute = execute;
