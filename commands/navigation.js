import { resolve } from 'path';
import { chdir, cwd } from 'process';
import { readdir } from 'fs/promises';

import { consoleWriteCwd, consoleWriteError, consoleWriteErrorPERM } from '../consoleWrite.js';

export const cd = async rowURL => {
    const url = rowURL.endsWith(':') ? `${rowURL}/` : rowURL;
    const path = resolve(cwd(), url);
    try {
        chdir(path);
    } catch (err) {
        consoleWriteError();
        if (err.code === 'EPERM') consoleWriteErrorPERM();
    };
    consoleWriteCwd();
};

export const ls = async () => {
    const files = await readdir(cwd(), { withFileTypes: true });
    files.sort();
    const table = files.map(file => {
        return {
            Name: file.name,
            Type: file['isFile']() ? 'file' : 'directory',
        };
    });
    table.sort((a, b) => {
        if (a.Type > b.Type) return 1;
        if (a.Type == b.Type) return 0;
        if (a.Type < b.Type) return -1;
    });
    console.table(table);
    consoleWriteCwd();
};