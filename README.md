# **README File**

<a id="readme-top"></a>

## **Script Hub**

Script Hub is a tool to merge all the scripts into one place.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Introduction**

This is a hub for scripts, in order to have a place to easily interact with all the scripts,
instead of having them all scattered and having the way to interact with them all in a different way.
This offers a place to unify the interaction with the scripts, making it easier to use.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Installation**

To install the Script Hub, follow these steps:

1. Select the folder where you have the project(s)
2. Clone the repository: **`git clone https://github.com/dariojorge/ScriptsHub.git`**
3. Make sure you have the Node.js installed in you machine
4. In case you don't have the Node.js installed go to the page: **`https://nodejs.org/en/download`**

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Usage**

To use Script Hub, follow these steps:

1. Open a terminal inside the folder scriptsHub
2. Run the **`./scriptsHub`**
3. For the options and it's arguments follow this table: [Table Of Commands](#table-of-commands) and for more info about
   the arguments used [Table of Arguments](#table-of-arguments)

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Table Of Commands**

| Command                                                                                                | Description                                                                                          |
|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| `./scriptHub.sh scriptType=runners type=create projects=<projects> createFiles=<true/false>`           | This command is to copy the runners from the projects folder to the intellij                         |
| `./scriptHub.sh scriptType=runners type=update projects=<projects> env=<env>`                          | This command is to update the environment variables from the runners inside intellij                 |
| `./scriptHub.sh scriptType=runners type=test projects=<projects> env=<env>`                            | This command is to test the environment variables from the runners inside intellij no action applied |
| `./scriptHub.sh scriptType=win type=kill_port_usage port=<port>`                                       | This command is to kill a process using the selected port on windows OS                              |
| `./scriptHub.sh scriptType=git type=TBD`            (WIP)                                              | TBD                                                                                                  |
| `./scriptHub.sh scriptType=docker type=TBD`         (WIP)                                              | TBD                                                                                                  |
| `./scriptHub.sh scriptType=template type=script scriptName=<scriptName> operationName=<operationName>` | This command is to generate a new default script structure                                           |
| `./scriptHub.sh scriptType=template type=runner projectName=<projectName> techType=<techType>`         | This command is to generate a new default runner structure for a project                             |
| `./scriptHub.sh scriptType=demo type=quarkus demoType=demo-quarkus version=<java-version>`             | This command sets up the quarkus demo to be used **Note:** The java version should be 17+            |

**Note:** The Runners scripts where made for the intellij IDE

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Table of Arguments**

| Argument      | Description                                                                                                                                                                             |
|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| scriptType    | This argument is to identify the type of script to be used                                                                                                                              |
| type          | This argument is to identify the type of action to be used                                                                                                                              |
| <hr />        | <hr />                                                                                                                                                                                  |
| projects      | This argument is to identify the projects of the runners to configure. **Note:** If nothing is passed, this will look at the folder projects, but the "demo-" projects will be excluded |
| createFiles   | This argument is to identify if the create runners will override existing files                                                                                                         |
| env           | This argument is to identify the environment configure in the runners                                                                                                                   |
| <hr />        | <hr />                                                                                                                                                                                  |
| scriptName    | This argument is to identify what will be the type of script to generate                                                                                                                |
| operationName | This argument is to identify the operation that will be generated for the script                                                                                                        |
| techType      | This argument is to identify the type of tech to be used from the template e.g: Quarkus                                                                                                 |
| <hr />        | <hr />                                                                                                                                                                                  |
| demoType      | This argument is to identify what demo will be used to be setup                                                                                                                         |
| <hr />        | <hr />                                                                                                                                                                                  |
| port          | This argument is to identify what is the port to be used to search and close the process using it                                                                                       |

## **License**

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Changelog**

See `CHANGELOG.md` for more information.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Authors and Acknowledgment**

Script Hub was created by **[Dário Jorge](https://github.com/dariojorge)**.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Road Map**

The Road map is still being developed, Coming Soon.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>