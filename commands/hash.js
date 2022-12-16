import { resolve } from 'path';
import { cwd } from 'process';
import { readFile } from 'fs/promises';
import { createHash } from 'crypto';

import { consoleWriteCwd, consoleWriteError, consoleWriteErrorPERM } from '../consoleWrite.js';

const hash = async url => {
    try {
        const path = resolve(cwd(), url);
        const file = await readFile(path);
        const hash = createHash('sha256');
        hash.update(file);
        console.log(hash.digest('hex'));
    } catch (err) {
        consoleWriteError();
        if (err.code === 'EPERM') consoleWriteErrorPERM();
    };
    consoleWriteCwd();
};

export default hash;