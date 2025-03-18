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
2. If you are using linux based OS then don't forget to make the runnable using the command **`chmod +x ./scriptHub.sh`**
3. To run the scripts check the [Table Of Commands](#table-of-commands) as we are listing there all the current commands
   possible with the script
4. For more info about the arguments used in the commands check the [Table of Arguments](#table-of-arguments) to know
   what each argument represents

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Table Of Commands**

| Command                                                                                                                     | Description                                                                                                                                                                                                         |
|-----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `./scriptHub.sh scriptType=runners type=create projects=<projects> createFiles=<true/false>`                                | This command is to copy the runners from the projects folder to the **Intellij only**                                                                                                                               |
| `./scriptHub.sh scriptType=runners type=update projects=<projects> env=<env>`                                               | This command is to update the environment variables from the runners inside **Intellij  only**. Check the [Configure Environments](documentation/RUNNERS.md#configure-environments-for-the-runners)                 |
| `./scriptHub.sh scriptType=runners type=test projects=<projects> env=<env>`                                                 | This command is to test the environment variables from the runners inside **Intellij only**  no action applied. Check the [Configure Environments](documentation/RUNNERS.md#configure-environments-for-the-runners) |
| `./scriptHub.sh scriptType=win type=kill_port_usage port=<port>`                                                            | This command is to kill a process using the selected port on windows OS                                                                                                                                             |
| `./scriptHub.sh scriptType=git type=squash numberOfCommits=<number> newCommitText=\"<commit text>\" projectPath=\"<path>\"` | This Command is to squash commits into one  [GIT Squash](documentation/GIT.md#git-squash)                                                                                                                           |
| `./scriptHub.sh scriptType=docker type=TBD`         (WIP)                                                                   | TBD                                                                                                                                                                                                                 |
| `./scriptHub.sh scriptType=template type=script scriptName=<scriptName> operationName=<operationName>`                      | This command is to generate a new default script structure                                                                                                                                                          |
| `./scriptHub.sh scriptType=template type=runner projectName=<projectName> techType=<techType>`                              | This command is to generate a new default runner structure for a project                                                                                                                                            |
| `./scriptHub.sh scriptType=demo type=quarkus demoType=demo-quarkus version=<java-version>`                                  | This command sets up the quarkus demo to be used check [Demo-Quarkus Setup](documentation/QUARKUS_DEMO.md#how-to-setup-demo-quarkus) **Note:** The java version should be 17+                                       |

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Table of Arguments**

| Argument        | Description                                                                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| scriptType      | This argument is to identify the type of script to be used                                                                                                                              |
| type            | This argument is to identify the type of action to be used                                                                                                                              |
| <hr />          | <hr />                                                                                                                                                                                  |
| projects        | This argument is to identify the projects of the runners to configure. **Note:** If nothing is passed, this will look at the folder projects, but the "demo-" projects will be excluded |
| createFiles     | This argument is to identify if the create runners will override existing files                                                                                                         |
| env             | This argument is to identify the environment configure in the runners                                                                                                                   |
| <hr />          | <hr />                                                                                                                                                                                  |
| scriptName      | This argument is to identify what will be the type of script to generate                                                                                                                |
| operationName   | This argument is to identify the operation that will be generated for the script                                                                                                        |
| techType        | This argument is to identify the type of tech to be used from the template e.g: Quarkus                                                                                                 |
| <hr />          | <hr />                                                                                                                                                                                  |
| demoType        | This argument is to identify what demo will be used to be setup                                                                                                                         |
| <hr />          | <hr />                                                                                                                                                                                  |
| port            | This argument is to identify what is the port to be used to search and close the process using it                                                                                       |
| <hr />          | <hr />                                                                                                                                                                                  |
| numberOfCommits | This argument is to identify what will be the number os commits to go back to                                                                                                           |
| newCommitText   | This argument is to identify what text will be added as the new commit message                                                                                                          |
| projectPath     | This argument is to identify what will be the project path to apply the squash                                                                                                          |

## **License**

Distributed under the MIT License. See [LICENSE](LICENCE) for more
information.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Changelog**

See [CHANGELOG](documentation/CHANGELOG.md) for more information.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Authors and Acknowledgment**

Script Hub was created by **[Dário Jorge](https://github.com/dariojorge)**.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Road Map**

The Road map is still being developed, Coming Soon.

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>