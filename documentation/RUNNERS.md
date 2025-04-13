# **RUNNERS**

## **Introduction**
The runners where created to generate and manage the intellij runners. 

## **Configure Environments for the Runners**

We have two type of behaviours the `update` and the `test`, when defining what to use in the command we need to say if the
environment variables will be applied or not, in case of the `update` the environment variables will be applied to the file,
for the `test` we will only show what can be changed.
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
We have the `additionalEnvs` object where we will be setting another way to have the environment variables, this has two types of behaviours:
 - read: This type it needs a file where it has the environment variables in a text file, this will not work in a json format yet, 
we also need to provide the `regexSearch` to search for the origin environment variable and build the list with the key environment using the `regexReplace`.
 - execute: This type you provide a script where it will execute it for the env list that we provide, it may interact with the `additionalData`.

We have the `additionalCmd` to run additional commands if we need, and we have two types of behaviour:
 - arg: This type will search for the argument in the `cmd`, the `value` will define the name of the argument and the `cmd` the command.
 - execute: This type will execute the `cmd` every time if the `value` will be set as true as this will be a true/false value.

We have the `additionalData` to have an additional list in case we need it for interactions with the scripts,
example the `additionalEnvs` execute could use the `additionalData` for extra information and behaviours.

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
    ],
    "additionalEnvs": [
        {
            "type": "read",
            "filePath": "<file path>",
            "regexSearch": "{ORIGIN}<regex to search>",
            "regexReplace": "<regex to replace>",
            "env": [
                {
                    "key": "<environment name>",
                    "origin": "<environment origin>"
                }
            ]
        },
        {
            "type": "execute",
            "filePath": "<file path>",
            "env": [
                {
                    "key": "<environment name>",
                    "value": "<environment value>"
                }
            ]
        }
    ],
    "additionalCmd": [
        {
            "type": "arg",
            "value": "<argument name>",
            "cmd": "<command to run>"
        },
        {
            "type": "execute",
            "value": "<true/false>",
            "cmd": "<command to run>"
        }
    ],
    "additionalData": []
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