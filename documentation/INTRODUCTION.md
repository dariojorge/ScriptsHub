# **RUNNERS EXAMPLE**

## **Introduction**
This is to show how to quickly setup and use the runners with some examples.

## **Configure NODE**
Check if the nodejs is installed by running the `node --version`.

You should see as the result something similar to: `v22.16.0`.

In case you don't have the Node.js installed go to the page: **`https://nodejs.org/en/download`**

## **Run the configuration**
To install the runners project, follow these steps:

1. Select the folder where you have the project(s).
2. Clone the repository: **`git clone https://github.com/dariojorge/ScriptsHub.git`**
3. Inside the project ScriptHub run the command: `npm install`

To check if the project is well configured run these two commands:
```sh
   ./scriptHub.sh scriptType=runners type=create recreateFiles=<true/false>
   ./scriptHub.sh scriptType=runners type=update env=<test/int/...>
```