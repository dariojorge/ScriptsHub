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
2. If you are using linux based OS then don't forget to make the runnable using the command **`chmod +x ./scriptHub.sh`
   **
3. To run the scripts check the [Table Of Commands](#table-of-commands) as we are listing there all the current commands
   possible with the script
4. For more info about the arguments used in the commands check the [Table of Arguments](#table-of-arguments) to know
   what each argument represents

<p style="text-align:right;">(<a href="#readme-top">back to top</a>)</p>

## **Table Of Commands**

| Command                                                                                                                     | Description                                                                                                                                                                                 |
|-----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `./scriptHub.sh scriptType=runners type=create projects=<projects> createFiles=<true/false>`                                | This command is to copy the runners from the projects folder to the **Intellij only**                                                                                                       |
| `./scriptHub.sh scriptType=runners type=update projects=<projects> env=<env>`                                               | This command is to update the environment variables from the runners inside **Intellij  only**. Check the [Configure Environments](#configure-environments-for-the-runners)                 |
| `./scriptHub.sh scriptType=runners type=test projects=<projects> env=<env>`                                                 | This command is to test the environment variables from the runners inside **Intellij only**  no action applied. Check the [Configure Environments](#configure-environments-for-the-runners) |
| `./scriptHub.sh scriptType=win type=kill_port_usage port=<port>`                                                            | This command is to kill a process using the selected port on windows OS                                                                                                                     |
| `./scriptHub.sh scriptType=git type=squash numberOfCommits=<number> newCommitText=\"<commit text>\" projectPath=\"<path>\"` | This Command is to squash commits into one                                                                                                                                                  |
| `./scriptHub.sh scriptType=docker type=TBD`         (WIP)                                                                   | TBD                                                                                                                                                                                         |
| `./scriptHub.sh scriptType=template type=script scriptName=<scriptName> operationName=<operationName>`                      | This command is to generate a new default script structure                                                                                                                                  |
| `./scriptHub.sh scriptType=template type=runner projectName=<projectName> techType=<techType>`                              | This command is to generate a new default runner structure for a project                                                                                                                    |
| `./scriptHub.sh scriptType=demo type=quarkus demoType=demo-quarkus version=<java-version>`                                  | This command sets up the quarkus demo to be used check [Demo-Quarkus Setup](#how-to-setup-demo-quarkus) **Note:** The java version should be 17+                                            |

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

## **How to Setup demo-quarkus**

1. To setup the demo, the first step would be to run the demo setup from the [Table Of Commands](#table-of-commands).
2. Example of the command to run: `./scriptHub.sh scriptType=demo type=quarkus demoType=demo-quarkus version=18`
3. After the command finishes we have the project in another folder on the same level as the ScriptHub project.
4. If you check, it should be something like this:

```bash
   .
   ├── ...
   ├── demo-quarkus       # Demo project
   ├── ScriptHub          # Script hub project
   └── ...
```

5. If you now run the command for the runners to create the files, this will create the runners for the project.
6. Example of the command to run: `./scriptHub.sh scriptType=runners type=create projects=demo-quarkus createFiles=true`
7. The expected behaviour will be to have the new runner files in the project:

```bash
   .
   ├── ...
   ├── demo-quarkus       # Demo project
   │   ├── .ideia
   │   │   ├── runConfigurations
   │   │   │   ├── junit_all_unit_demo_quarkus.run.xml
   │   │   │   ├── quarkus_demo_quarkus.run.xml         # Runner for the intellij ultimate
   │   │   │   └── quarkus_dev_demo_quarkus.run.xml     # Runner for the intellij community
   │   │   └── ...
   │   └── ...
   ├── ScriptHub          # Script hub project
   └── ...
```

8. Now we just need to update the environment variables in the runners by using the command to update.
9. Example of the command to run: `./scriptHub.sh scriptType=runners type=update projects=demo-quarkus env=test`
10. The expected result if that now the environment variables have the correct data. The option to change the data with
    the update command is in this path:

```bash
   .
   ├── ...
   ├── demo-quarkus       # Demo project
   ├── ScriptHub          # Script hub project
   │   ├── projects
   │   │   ├── demo-quarkus
   │   │   │   ├── runners
   │   │   │   │   └── ...       # This is where all the runners are placed for the project
   │   │   │   └── envs.json     # This is where we configure all the environment variables
   │   │   └── ...
   │   └── ...
   └── ...
```

11. Open the demo-quarkus project with the intellij and select the runner for the quarkus and run it.
12. After it finishes running open in the browser the with the url
    `http://localhost:8080/demo-quarkus/swagger/#/Demo%20Resource/get_demo_quarkus_demo` run the endpoint and see the
    result:

```json
{
    "message": "This is a message from the test env setting."
}
```

13. I you want to check another configuration, run the update and choose the `env=custom-message`, to see the changes
    you need to stop and start the project to take the effect of the change.
14. The result will be:

```json
{
    "message": "This is a custom message."
}
```

## **Configure Environments for the Runners**

To configure the environments for the projects we need to go to the projects folder and select the project and in that
folder we have the `envs.json` that we will configure:

```bash
   .
   ├── ...
   ├── ScriptHub          # Script hub project
   │   ├── projects
   │   │   ├── demo-quarkus
   │   │   │   ├── runners
   │   │   │   │   └── ...       # This is where all the runners are placed for the project
   │   │   │   └── envs.json     # This is where we configure all the environment variables
   │   │   └── ...
   │   └── ...
   └── ...
```

Inside the json file we will have `envs` object where we will be setting the list of environments.
This will be the structure:

```json
{
    "envs": [
        {
            "type": "<environment>",
            "env": [
                {
                    "key": "<environment name>",
                    "value": "<environment value>"
                }
            ]
        }
    ]
}

```

In the runner we need to feed the environment name to be searchable.
Example of the quarkus_dev runner:

```xml

<component name="ProjectRunConfigurationManager">
    <configuration default="false" name="[QUARKUS-DEV] Demo Quarkus" type="QuarkusRunConfiguration"
                   factoryName="QuarkusRunConfiguration">
        <option name="env">
            <map>
                <entry key="DEMO_MESSAGE" value="DEMO_MESSAGE"/> <!-- This is where we put the environment variables -->
            </map>
        </option>
        <module name="demo-quarkus"/>
        <option name="profile"/>
        <method v="2"/>
    </configuration>
</component>
```

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