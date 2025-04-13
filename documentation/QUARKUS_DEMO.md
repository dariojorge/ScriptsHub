# **QUARKUS DEMO**

## **Introduction**
The quarkus demo was created to show an example of how the process of using the scriptHub, in this case for a quarkus project.

## **How to Setup demo-quarkus**

1. To setup the demo, the first step would be to run the demo setup from the [Table Of Commands](../README.md#table-of-commands).
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
    "message03": "Why message?",
    "message02": "When this is a message.",
    "message01": "This message is a message."
}
```

13. I you want to check another configuration, run the update and choose the `env=test-without-message-2-and-3`, to see the changes
    you need to stop and start the project to take the effect of the change.
14. The result will be:

```json
{
    "message01": "This message is a message on forth environment config.",
    "message03": "Why message on the execute additionalEnvs?",
    "message02": "When this is a message from demoEnvs.txt."
}
```