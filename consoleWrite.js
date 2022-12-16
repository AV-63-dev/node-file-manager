import { EOL } from 'os';
import { cwd } from 'process';

export const consoleWriteWelcome = user => console.log('\x1b[32m%s\x1b[0m', `Welcome to the File Manager, ${user}!`);

export const consoleWriteCwd = () => console.log(`${EOL}You are currently in `, '\x1b[33m', `${cwd()}`, '\x1b[0m');

export const consoleWriteEolCwd = () => console.log(`${EOL}${EOL}You are currently in `, '\x1b[33m', `${cwd()}`, '\x1b[0m');

export const consoleWriteError = () => console.log('\x1b[31m%s\x1b[0m', 'Operation failed');

export const consoleWriteErrorPERM = () => console.log('\x1b[31m%s\x1b[0m', 'No access permission');

export const consoleWriteInvalid = () => console.log('\x1b[31m%s\x1b[0m', 'Invalid input');

export const consoleWriteGoodbye = user => console.log('\x1b[34m%s\x1b[0m', `Thank you for using File Manager, ${user}, goodbye!`);

export const consoleWriteStart = () => console.log('\x1b[31m%s\x1b[0m', 'Please enter the command in the format: npm run start -- --username=your_username');