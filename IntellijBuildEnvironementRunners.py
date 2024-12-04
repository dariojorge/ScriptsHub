import time, os.path
import json
import xml.etree.ElementTree as ET

pathEnv = 'runners.json'
pathScripts = os.path.dirname(__file__)
pathRoot = os.path.dirname(pathScripts)
pathXml = os.path.realpath(pathRoot + "/.idea/workspace.xml")

### Python Global Vars
_configuration = "configuration"
_component = "component"
_element = "element"
_item = "item"
_itemvalue = "itemvalue"
_list = "list"
_name = "name"
_run_manager = "RunManager"
_subElement = "subElement"
_text = "text"
### End Python Global Vars

### Python Functions
def readJson():
    with open(pathEnv) as jsonFile:
        return json.load(jsonFile)

def loadXmlTreeAndUpdateIt(jsonFile):
    tree = ET.parse(pathXml)
    root = tree.getroot()

    for component in root:
        loadComponent(component)

    tree.write(pathXml)

def loadComponent(parentElem):
    if parentElem.tag == _component and parentElem.attrib[_name] == _run_manager:
        removeAllChildNodes(parentElem)
        for json in jsonFile[_configuration]:
            buildRunnerWithJson(parentElem, json, _configuration)
        buildList(parentElem)

def buildRunnerWithJson(parentElem, json, elemName):
    newElement = None
    for jsonKey in json.keys():
        newElement = buildNewElement(parentElem, elemName, newElement, json[jsonKey], jsonKey)

def buildNewElement(parentElem, elemName, newElement, json, jsonKey):
    if jsonKey == _text:
        if newElement is None:
            ET.SubElement(parentElem, elemName).text = json
            return None
        if newElement is not None:
            newElement.text = json
            return newElement
    if jsonKey == _subElement:
        return buildSubElementWithJson(parentElem, elemName, json)
    if jsonKey == _element:
        if newElement is None:
            buildElemWithJson(ET.SubElement(parentElem, elemName), json)
        if newElement is not None:
            buildElemWithJson(newElement, json)
        return None

def buildSubElementWithJson(parentElem, elemName, json):
    newElement = ET.SubElement(parentElem, elemName)
    for subElem in json:
        newElement.set(subElem, json[subElem])
    return newElement

def buildElemWithJson(parentElem, json):
    for elem in json:
        if len(json[elem]) == 0:
            ET.SubElement(parentElem, elem)
        if type(json[elem]) is list:
            for jsonElem in json[elem]:
                buildRunnerWithJson(parentElem, jsonElem, elem)
        if type(json[elem]) is not list:
            buildRunnerWithJson(parentElem, json[elem], elem)

def removeAllChildNodes(parentElem):
    while len(parentElem.findall("*")):
        parentElem.remove(parentElem.findall("*")[0])

def buildList(parentElem):
    list = ET.SubElement(parentElem, _list)
    for element in parentElem:
        if _name in element.attrib:
            item = ET.SubElement(list, _item)
            item.set(_itemvalue, element.attrib[_name])

### End Python Functions

jsonFile = readJson()
loadXmlTreeAndUpdateIt(jsonFile)
print("\nDone!")