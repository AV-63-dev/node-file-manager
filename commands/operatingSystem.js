import { EOL, cpus, userInfo, arch } from 'os';

import { consoleWriteCwd, consoleWriteError } from '../consoleWrite.js';

const os = async argOS => {
    try {
        switch(argOS) {
            case '--EOL':
                console.log(JSON.stringify(EOL));
                break;      
            case '--cpus':
                console.table(cpus().map(item => {
                    return {
                        model: item.model,
                        'clock rate (GHz)': (item.speed/1000).toFixed(1)
                    };
                }));
                break;
            case '--homedir':
                console.log(userInfo().homedir);
                break;
            case '--username':
                console.log(userInfo().username);
                break;
            case '--architecture':
                console.log(arch());
                break;
        };
    } catch {
        consoleWriteError();
    };
    consoleWriteCwd();
};

export default os;