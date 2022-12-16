export const getOnePath = str => {
    const args = convertStrToArgs(str);
    return (args && args.length === 1) ? args[0] : false;
};

export const getOneBasename = str => {
    const args = convertStrToArgs(str);
    return (args && args.length === 1 && ! /\/|\\]/g.test(args[0])) ? args[0] : false;
};

export const getPathAndBasename = str => {
    const args = convertStrToArgs(str);
    return (args && args.length === 2 && ! /\/|\\]/g.test(args[1])) ? args : false;
};

export const getPathAndPath = str => {
    const args = convertStrToArgs(str);
    return (args && args.length === 2) ? args : false;
};

const argsOS = ['--EOL', '--cpus', '--homedir', '--username', '--architecture'];
export const getArgOS = str => {
    const args = convertStrToArgs(str);
    return (args && args.length === 1 && argsOS.includes(args[0])) ? args[0] : false;
};

// Для разбора функции раскоментируй строки и запусти handlerArgs.js отдельно.
// А если ты не любишь регулярки - значит ты не умеешь их готовить😁😁😁
const convertStrToArgs = data => {
    const args = []
    let validInput = true;
    // data = 'args1 --args2 123 "" "str args3" "str args\'4" \'\' \'str args5\' \'str args"6 😁\' ar"gs\'8"';
    const strData = data.trim();
    const reg = /[^\s"']+|"[^"]*"|'[^']*'/g;
    let itemArr;
    while ( (itemArr = reg.exec(strData)) !== null ) {
        const indexBefore = itemArr['index'] - 1;
        const indexAfter = itemArr['index'] + itemArr[0].length;
        validInput = ( (indexBefore === -1 || strData[indexBefore] === ' ') && (indexAfter === strData.length || strData[indexAfter] === ' ') ) ? true : false;
        // itemArr['validInput'] = validInput;
        // console.log(itemArr);
        if (validInput) {
            const str = /"|'/g.test(itemArr[0]) ? itemArr[0].slice(1, -1) : itemArr[0];
            if (str) args.push(str);
        } else {
            break;
        };
    };
    return validInput ? args : false;
};
// convertStrToArgs('data');