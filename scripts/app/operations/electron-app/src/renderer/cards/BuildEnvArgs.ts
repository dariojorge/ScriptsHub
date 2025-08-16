const defaultEnvsArgs: EnvsArgs = {
    envs: [],
    args: []
};

export const loadBasePath = async (setBasePath: React.Dispatch<React.SetStateAction<string | undefined>>) => {
    const base = await window.electronAPI.getAppPath();
    const root = await window.electronAPI.goUpFolders(base, "../../../..");
    setBasePath(root);
}

export const loadProjectsData = async (basePath: string, projects: string[]): Promise<EnvsArgsModel[]> => {
    const envsAndArgs: EnvsArgsModel[] = [];
    await projects.forEach(async (project) => {
        envsAndArgs.push({
            envsArgs: await loadEnvsFile(basePath, project),
            type: project
        });
    });

    return envsAndArgs;
}

const loadEnvsFile = async (basePath: string, projectName: string): Promise<EnvsArgs> => {
    const result = await window.electronAPI.loadFile(`${basePath}/projects/${projectName}/envs.json`);

    if (result.success) {
        return addEnvArgs(result.data);
    } else {
        console.error('Failed to load file:', result.error);
        return defaultEnvsArgs;
    }
}

const addEnvArgs = (data: any): EnvsArgs => {
    const jsonData = JSON.parse(data);
    const envList = jsonData.envs.map((env: any) => env.type);
    const additionalCmd = jsonData.additionalCmd.filter((cmd: any) => cmd.type === "arg").map((cmd: any) => cmd.value);
    return {
        envs: envList,
        args: additionalCmd
    };
};