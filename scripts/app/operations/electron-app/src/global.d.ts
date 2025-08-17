export { };

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      getAppPath: () => Promise<string>;
      goUpFolders: (base: string, levels: string) => Promise<string>;
      loadFile: (filePath: string) => Promise<any>;
      pathSep: (value: string) => Promise<string>;
      dbInsert: (id: string, data: any) => Promise<any>;
      dbFindOne: (id: string) => Promise<any>;
      dbGetAll: (id: string) => Promise<any>;
      dbRemoveOne: (id: string) => Promise<any>;
      dbUpdate: (id: string, data: any) => Promise<any>;
      getListOfFolders: (path: string) => Promise<string[]>;
      execSync: (cmd: string) => Promise<string>;
      onOutput: (callback: (data: string) => void) => void;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }

  const __APP_VERSION__: string;
}
