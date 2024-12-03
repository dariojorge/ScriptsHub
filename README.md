# **README File**

## **Intellij-script-for-setup-runners**

Intellij-script-for-setup-runners is a tool for intellij to build the runner from a json file.

## **Introduction**

Intellij-script-for-setup-runners is a project that makes the creation of the runners in the intellij be more agile and automatic, additionally maintaining the runners is easier as the json file is that we need to change.

## **Installation**

To install Intellij-script-for-setup-runners, follow these steps:

1. Clone the repository: **`git clone https://github.com/dariojorge/Intellij-script-for-setup-runners.git`**
2. Navigate to the project directory: **`cd Intellij-script-for-setup-runners`**
3. **Copy** the file **IntellijBuildEnvironementRunners.py**
4. In the Intellij project, create the folder **scripts** in the root project
5. Put the IntellijBuildEnvironementRunners.py file inside
6. Create a json file envVariables.json

## **Usage**

To use Intellij-script-for-setup-runners, follow these steps:

1. Open the project in your favorite code editor.
2. Open the file envVariables.json.
3. Add the runners settings in the json
4. Run the python script with the command `py IntellijBuildEnvironementRunners.py`
5. Use the project as desired.

## **How to setup the json file**

For the json file we have a few rules for the setup:

1. The root file needs to be `configuration` and it is an array:
```Json
{
    "configuration": []
}
```

2. Each node has a subElement and a element:    
![SubElement and element](node-child.png)

- The subElement is the attributes of the node:
    - Json example  
    ![Child Node Examples](node-sub-element-json.png)
    - Xml example
    ![Child Node Examples](node-sub-element-xml.png)
- The element is where we define the child nodes:
    - Json example   
    ![Child Node Json](node-child-json.png)
    - Xml example  
    ![Child Node Xml](node-child-xml.png)
3. The element will have the nodes required for the runner, example:
    ![Element Nodes](element-nodes.png)
- In the example we have the module and the option, this will create the xml nodes module and option.
    ![Created Nodes](created-nodes.png)

<details>

<summary>Json Example</summary>

```Json
{
    "configuration": [
        {
            "subElement": {
                "name": "RunnerExample",
                "type": "QuarkusRunConfiguration",
                "factoryName": "QuarkusRunConfiguration"
            },
            "element": {
                "module": {
                    "subElement": {
                        "name": "module name"
                    }
                },
                "option": [
                    {
                        "subElement": {
                            "name": "env"
                        },
                        "element": {
                            "map": {
                                "element": {
                                    "entry": {
                                        "subElement": {
                                            "key": "LOG_LEVEL",
                                            "value": "INFO"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        "subElement": {
                            "name": "profile"
                        }
                    }
                ]
            }
        }
    ]
}
```

</details>
<details>

<summary>Xml Example</summary>

```Xml
<configuration name="RunnerExample" type="QuarkusRunConfiguration" factoryName="QuarkusRunConfiguration">
    <option name="env">
        <map>
            <entry key="LOG_LEVEL" value="INFO" />
        </map>
    </option>
    <module name="module name" />
    <option name="profile" />
    <method v="2" />
</configuration>
```

</details>

## **License**

Intellij-script-for-setup-runners is released under the MIT License. See the **[LICENSE](https://www.blackbox.ai/share/LICENSE)** file for details.

## **Authors and Acknowledgment**

Intellij-script-for-setup-runners was created by **[Dário Jorge](https://github.com/dariojorge)**.

## **FAQ**

**Q:** Does the Script deletes all the custom runners?

**A:** Yes, as the json is used to maintain the runners it needs ti delete the runners before for a fresh update.

**Q:** How do I install Intellij-script-for-setup-runners?

**A:** Follow the installation steps in the README file.

**Q:** How do I use Intellij-script-for-setup-runners?

**A:** Follow the usage steps in the README file.

**Q:** What license is Intellij-script-for-setup-runners released under?

**A:** Intellij-script-for-setup-runners is released under the MIT License. See the **[LICENSE](https://www.blackbox.ai/share/LICENSE)** file for details.

## **Changelog**

- **0.1.0:** Initial release