import { useEffect, useRef, useState } from "react";
import { firstElement, getElementByType } from "../utils/utils";
import CardList from "../cards/card-list";

const RUNNERS = "runners";

const RunnersComponent: React.FC = () => {
    const isInitialRender = useRef(false);
    const [baseFilePath, setBaseFilePath] = useState<string>();
    const [settingsData, setSettingsData] = useState<SettingsModel>();
    const [runnersPath, setRunnersPath] = useState<string>();
    const [runnersData, setRunnersData] = useState<SettingsModel>();
    const [runnersList, setRunnersList] = useState<string[]>();
    const [operationsPath, setOperationsPath] = useState<string>();
    const [operationsData, setOperationsData] = useState<SettingsModel>();
    const [operationsList, setOperationsList] = useState<string[]>();
    const [projects, setProjects] = useState<string[]>();

    useEffect(() => {
        isInitialRender.current = true;
        loadPath();
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            return;
        }

        loadSettingsFile(baseFilePath!, setSettingsData);
    }, [baseFilePath]);

    useEffect(() => {
        if (isInitialRender.current) {
            return;
        }

        const runners = getElementByType(settingsData?.types!, RUNNERS);
        const runnersPathFiltered: string = `${baseFilePath}${runners.basePath.replace(".", "")}`;
        window.electronAPI.pathSep(runnersPathFiltered).then(value => setRunnersPath(value));
    }, [settingsData]);

    useEffect(() => {
        if (isInitialRender.current) {
            return;
        }

        loadSettingsFile(runnersPath!, setRunnersData);
    }, [runnersPath]);

    useEffect(() => {
        if (isInitialRender.current) {
            return;
        }

        const runners: string[] = [];
        runnersData?.types.forEach(element => runners.push(element.type));
        setRunnersList(runners);

        const operations = firstElement(runnersData?.types!);
        const operationsPathFiltered: string = `${runnersPath}${operations.basePath.replace(".\/", "")}`;
        window.electronAPI.pathSep(operationsPathFiltered).then(value => setOperationsPath(value));
    }, [runnersData]);

    useEffect(()=> {
        if (isInitialRender.current) {
            return;
        }

        loadSettingsFile(operationsPath!, setOperationsData);
    }, [operationsPath]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const operations: string[] = [];
        operationsData?.types.forEach(element => operations.push(element.type));
        setOperationsList(operations);
    }, [operationsData]);

    const loadPath = async () => {
        const base = await window.electronAPI.getAppPath();
        const root = await window.electronAPI.goUpFolders(base, "../../../..");
        setBaseFilePath(root);

        const projectsPath = await window.electronAPI.pathSep(`${root}/projects`);
        setProjects(await window.electronAPI.getListOfFolders(projectsPath));
    }

    const loadSettingsFile = async (filePath: string, setData: any) => {
        const result = await window.electronAPI.loadFile(`${filePath}/settings.json`);

        if (result.success) {
            const typeList: SettingsModel = JSON.parse(result.data);
            setData(typeList);
        } else {
            console.error('Failed to load file:', result.error);
        }
    }

    return (
        <>
            <div>⚙️ RUNNERS PROFILES</div>
            <CardList projects={projects!}></CardList>
        </>
    );
}

export default RunnersComponent;