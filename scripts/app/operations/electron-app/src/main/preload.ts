import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  ping: () => ipcRenderer.invoke('ping'),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  goUpFolders: (basePath: string, levelsUp: string) => ipcRenderer.invoke('go-up-folders', basePath, levelsUp),
  loadFile: (filePath: string) => ipcRenderer.invoke('load-file', filePath),
  pathSep: (value: string) => ipcRenderer.invoke('path-sep', value),
  dbInsert: (id: string, data: any) => ipcRenderer.invoke('db-insert', id, data),
  dbFindOne: (id: string) => ipcRenderer.invoke('db-find-one', id),
  dbGetAll: (id: string) => ipcRenderer.invoke('db-get-all', id),
  dbRemoveOne: (id: string) => ipcRenderer.invoke('db-remove-one', id),
  dbUpdate: (id: string, data: any) => ipcRenderer.invoke('db-update', id, data),
  getListOfFolders: (path: string) => ipcRenderer.invoke('get-list-of-folders', path),
  execSync: (cmd: string) => ipcRenderer.invoke('exec-sync', cmd),
  onOutput: (callback: (data: string) => void) => ipcRenderer.on('command-output', (_event, data) => callback(data)),
});
