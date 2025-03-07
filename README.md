
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
2. Clone the repository: **`git clone <tbd>`**
3. Make sure you have the Node.js installed in you machine
4. In case you don't have the Node.js installed go to the page: **`https://nodejs.org/en/download`**

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Usage**

To use Script Hub, follow these steps:

1. Open a terminal inside the folder scriptsHub
2. Run the **`./scriptsHub`**
3. For the options and it's arguments follow this table: [Table Of Commands](#usage-table)

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Table Of Commands**

| Command                                                                                      | Description                                                                                                         |
|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `./scriptHub.sh scriptType=runners type=create projects=<projects> createFiles=<true/false>` | This command is to copy the runners from the projects folder to the intellij                                        |
| `./scriptHub.sh scriptType=runners type=update projects=<projects> env=<env>`                | This command is to update the environment variables from the runners inside intellij                                |
| `./scriptHub.sh scriptType=runners type=test projects=<projects> env=<env>`                  | This command is to test the environment variables from the runners inside intellij no action applied                |
| `./scriptHub.sh scriptType=win type=kill_port_usage port=<port>`                             | This command is to kill a process using the selected port on windows OS                                             |
| `./scriptHub.sh scriptType=git type=TBD`            (WIP)                                    | TBD                                                                                                                 |
| `./scriptHub.sh scriptType=docker type=TBD`         (WIP)                                    | TBD                                                                                                                 |
| `./scriptHub.sh scriptType=template type=script scriptName=<scriptName>`    (WIP)            | This command is to generate a new default script structure                                                          |
| `./scriptHub.sh scriptType=template type=runner projectName=<projectName>`    (WIP)          | This command is to generate a new default runner structure for a project                                            |
