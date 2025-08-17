import { execSync, ExecSyncOptionsWithStringEncoding, spawn } from 'child_process';
import path from 'path';

const rootPath = path.join(__dirname, "../../../../..");
const isWindows = process.platform === 'win32';
const bashShell = isWindows
    ? 'C:\\Program Files\\Git\\bin\\bash.exe'
    : '/bin/bash';

const options: ExecSyncOptionsWithStringEncoding = {
    cwd: rootPath,
    encoding: 'utf8',
    shell: bashShell,
}

const runCommand = (command: string, event: any) => {
    /*try {
        return execSync(cmd, options);
    } catch (err: any) {
        console.error('[ERROR] Failed to run bash command:', err.message);
        throw err;
    }*/
    const [cmd, ...args] = command.split(' ');

    const child = spawn(cmd, args, options);

    child.stdout!.on('data', (data) => {
        event.sender.send('command-output', data.toString());
    });

    child.stderr!.on('data', (data) => {
        event.sender.send('command-output', data.toString());
    });

    child.on('close', (code) => {
        event.sender.send('command-output', `\nProcess exited with code ${code}`);
    });
}

export default runCommand; 
