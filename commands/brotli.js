import { resolve, join, basename } from 'path';
import { cwd } from 'process';
import { constants, open } from 'fs/promises';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

import { existPath, createNewDirectory } from './fileSystem.js';
import { consoleWriteCwd, consoleWriteError, consoleWriteErrorPERM } from '../consoleWrite.js';

const brotli = async (args, operation) => {
    const [onePath, twoPath] = args;
    const pathFrom = resolve(cwd(), onePath);
    const name = operation === 'compress' ? `${basename(pathFrom)}.br` : basename(pathFrom, '.br');
    const directory = resolve(cwd(), twoPath);
    const pathTo = join(directory, name);
    try {
        if (await existPath(pathTo)) throw new Error;
        const filehandle = await open(pathFrom, constants.R_OK);
        await createNewDirectory(directory);
        const writableStream = createWriteStream(pathTo);
        const readableStream = filehandle.createReadStream();
        const BrotliStream = operation === 'compress' ? createBrotliCompress() : createBrotliDecompress();
        await pipeline(readableStream, BrotliStream, writableStream);
    } catch (err) {
        consoleWriteError();
        if (err.code === 'EPERM') consoleWriteErrorPERM();
    };
    consoleWriteCwd();
};

export default brotli;