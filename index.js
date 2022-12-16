'use strict';

import { homedir } from 'os';
import { createInterface } from 'readline';
import { stdin as input, stdout as output, chdir } from 'process';

import { consoleWriteWelcome, consoleWriteCwd, consoleWriteInvalid, consoleWriteGoodbye, consoleWriteStart } from './consoleWrite.js';
import * as handlerArgs from './handlerArgs.js';
import * as nav from './commands/navigation.js';
import * as fs from './commands/fileSystem.js';
import os from './commands/operatingSystem.js';
import hash from './commands/hash.js';
import brotli from './commands/brotli.js';

const start = async user => {
    consoleWriteWelcome(user);
    chdir(homedir());
    consoleWriteCwd();

    const rl = createInterface({ input, output });
    rl.on('line', async data => {
        let path, basename, args, argOS;
        const str = data.trim();
        if (str === '.exit') {
            end(rl, user);
        } else if (str === 'up') {
            await nav.cd('..');
        } else if ( str.startsWith('cd ') && (path = handlerArgs.getOnePath(str.slice(3))) ) {
            await nav.cd(path);
        } else if (str === 'ls') {
            await nav.ls();
        } else if ( str.startsWith('cat ') && (path = handlerArgs.getOnePath(str.slice(4))) ) {
            await fs.cat(path);
        } else if ( str.startsWith('add ') && (basename = handlerArgs.getOneBasename(str.slice(4))) ) {
            await fs.add(basename);
        } else if ( str.startsWith('rn ') && (args = handlerArgs.getPathAndBasename(str.slice(3))) ) {
            await fs.rn(args);
        } else if ( str.startsWith('cp ') && (args = handlerArgs.getPathAndPath(str.slice(3))) ) {
            await fs.cp(args);
        }  else if ( str.startsWith('mv ') && (args = handlerArgs.getPathAndPath(str.slice(3))) ) {
            await fs.mv(args);
        } else if ( str.startsWith('rm ') && (path = handlerArgs.getOnePath(str.slice(3))) ) {
            await fs.rm(path);
        } else if ( str.startsWith('os ') && (argOS = handlerArgs.getArgOS(str.slice(3))) ) {
            await os(argOS);
        }  else if ( str.startsWith('hash ') && (path = handlerArgs.getOnePath(str.slice(5))) ) {
            await hash(path);
        } else if ( str.startsWith('compress ') && (args = handlerArgs.getPathAndPath(str.slice(9))) ) {
            await brotli(args, 'compress');
        } else if ( str.startsWith('decompress ') && (args = handlerArgs.getPathAndPath(str.slice(11))) ) {
            await brotli(args, 'decompress');
        } else {
            consoleWriteInvalid();
            consoleWriteCwd();
        };
    }).on('SIGINT', () => end(rl, user));
};

const end = (rl, user) => {
    consoleWriteGoodbye(user);
    rl.close();
};

const argsStart = process.argv.slice(2);
const [key, user] = (argsStart.length === 1) ? argsStart[0].split('=') : [null, null];
if ( (key === '--username') && user ) {
    await start(user);
} else {
    consoleWriteStart();
};