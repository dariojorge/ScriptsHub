interface SettingsModel {
    types: Type[];
    type: string;
}

interface Type {
    name: string;
    type: string;
    basePath: string;
    script: string;
}