import { resolve, join, basename, dirname } from 'path';
import { cwd, stdout as output } from 'process';
import { createReadStream, createWriteStream } from 'fs';
import { writeFile, rename, access, constants, mkdir, rm as rmOrigin, open } from 'fs/promises';
import { pipeline } from 'stream/promises';

import { consoleWriteCwd, consoleWriteError, consoleWriteErrorPERM, consoleWriteEolCwd } from '../consoleWrite.js';

export const existPath = async path => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch {
        return false;
    };
};

export const createNewDirectory = async path => {
    const basenameArr = [];
    const existBasename = async url => {
        if (! await existPath(url)) {
            basenameArr.push(basename(url));
            url = await existBasename(dirname(url));
        };
        return url;
    };
    let pathItem =  await existBasename(path);

    try {
        for (let i = basenameArr.length - 1; i > -1; i--) {
            pathItem = join(pathItem, basenameArr[i]);
            await mkdir(pathItem);
        };
    } catch (err) { throw err };
};

export const cat = async url => {
    const path = resolve(cwd(), url);
    const stream = createReadStream(path, { encoding: 'utf8'});
    stream.pipe(output);
    stream.on('end', () => consoleWriteEolCwd());
    stream.on('error', err => {
        consoleWriteError();
        if (err.code === 'EPERM') consoleWriteErrorPERM();
        consoleWriteCwd();
    });
};

export const add = async url => {
    const path = resolve(cwd(), url);
    try {
        await writeFile(path, '', { flag: 'wx' });
    } catch {
        consoleWriteError();
    };
    consoleWriteCwd();
};

export const rn = async args => {
    const [path, basename] = args;
    const oldPath = resolve(cwd(), path);
    const newPath = join(oldPath, '..', basename);
    try {
        if (await existPath(newPath)) throw new Error;
        await rename(oldPath, newPath);
    } catch (err) {
        consoleWriteError();
        if (err.code === 'EPERM') consoleWriteErrorPERM();
    };
    consoleWriteCwd();
};

export const cp = async args => {
    const [onePath, twoPath] = args;
    const path = resolve(cwd(), onePath);
    const name = basename(path);
    const directory = resolve(cwd(), twoPath);
    const newPath = join(directory, name);
    try {
        if (await existPath(newPath)) throw new Error;
        const filehandle = await open(path, constants.R_OK);
        await createNewDirectory(directory);
        const writableStream = createWriteStream(newPath);
        const readableStream = filehandle.createReadStream({ encoding: 'utf8' });
        await pipeline(readableStream, writableStream);
    } catch (err) {
        consoleWriteError();
        if (err.code === 'EPERM') consoleWriteErrorPERM();
    };
    consoleWriteCwd();
};

export const rm = async url => {
    const path = resolve(cwd(), url);
    try {
        await rmOrigin(path);
    } catch (err) {
        consoleWriteError();
        if (err.code === 'EPERM') consoleWriteErrorPERM();
    };
    consoleWriteCwd();
};

export const mv = async args => {
    const [onePath, twoPath] = args;
    const path = resolve(cwd(), onePath);
    const name = basename(path);
    const directory = resolve(cwd(), twoPath);
    const newPath = join(directory, name);
    try {
        if (await existPath(newPath)) throw new Error;
        const filehandle = await open(path, constants.R_OK & constants.X_OK);
        await createNewDirectory(directory);
        const writableStream = createWriteStream(newPath);
        const readableStream = filehandle.createReadStream({ encoding: 'utf8' });
        await pipeline(readableStream, writableStream);
        await rmOrigin(path);
    } catch (err) {
        consoleWriteError();
        if (err.code === 'EPERM') consoleWriteErrorPERM();
    };
    consoleWriteCwd();
};