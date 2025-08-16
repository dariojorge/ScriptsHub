interface RunnersProfileModel {
    id: number;
    title: string;
    description: string;
    scriptType: string;
    type: string;
    projects: string[];
    recreateFiles: boolean;
    env: string;
    additionalArgs: AdditionalArg[];
    activeProfile: boolean;
}

interface AdditionalArg {
    key: string;
    value: boolean;
}