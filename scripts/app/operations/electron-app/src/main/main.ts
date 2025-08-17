import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from "fs";
import { findOne, getAll, insert, removeOne, updateData } from './db/db-control';
import runCommand from './child-process/ChildProcess';

// TODO: Need to revisit this one

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  win.loadFile(path.join(__dirname, './renderer/index.html'));
  //win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('ping', () => {
  return 'pong from main process!';
});

ipcMain.handle('get-app-path', () => {
  return app.getAppPath();
});

ipcMain.handle('go-up-folders', (event, basePath: string, levelsUp: string) => {
  return path.resolve(basePath, levelsUp);
});

ipcMain.handle('load-file', async (event, filePath: string) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('path-sep', async (event, value: string) => {
  return value.replaceAll("\/", path.sep);
});

ipcMain.handle('db-insert', async (event, id: string, data: any) => {
  return insert(id, data);
});

ipcMain.handle('db-find-one', async (event, id: string): Promise<any> => {
  return findOne(id);
});

ipcMain.handle('get-list-of-folders', async (event, path: string): Promise<any> => {
  return fs.readdirSync(path, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
});

ipcMain.handle('db-get-all', async (event, id: string): Promise<any> => {
  return getAll(id);
});

ipcMain.handle('db-remove-one', async (event, id: string): Promise<any> => {
  return removeOne(id);
});

ipcMain.handle('db-update', async (event, id: string, data: any) => {
  return updateData(id, data);
});

ipcMain.handle('exec-sync', async (event, cmd: string) => {
  return runCommand(cmd, event);
});