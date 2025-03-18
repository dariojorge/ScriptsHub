# **RUNNERS**

## **Introduction**
The runners where created to generate and manage the intellij runners. 

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