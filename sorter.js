const fs = require('fs');
const fs2 = require('fs-extra');
const colors = require('colors');
const glob = require('glob');
const prompts = require('prompts');

const check_folder = './logs';
const results_folder = './results';

function logo() {
    console.clear();
    console.log('');
    console.log(`${`  ▄▀█ █ █ █▀▀ █▀ █▀█ █▀█ ▀█▀ █▀▀ █▀█ `.brightBlue}${`special thanks to @lolpiala`.brightYellow}`);
    console.log(`${`  █▀█ ▀▄▀ ██▄ ▄█ █▄█ █▀▄  █  ██▄ █▀▄ `.brightBlue}${`made with luv by samourai lzt <3`.brightRed}`);
    console.log();
    console.log('');
}

function randomshit() {
    const jokes = ['Starting silent miner...', 'Stealing your password...', 'Loading virus into your PC...', 'Sending your Discord Token to the server...', 'We are starting to use your computer as a proxy for credit card frauding...'];
    let shit = jokes[Math.floor(Math.random() * jokes.length)];
    console.log(``, shit.gray); // Garry
}

function clear_prev() {
    return new Promise(async (resolve, reject) => {
        const menu = await prompts([
            {
                type: 'select',
                name: 'text',
                message: 'Clear previous results?',
                choices: [
                    { title: 'Yes', value: true },
                    { title: 'No', value: false }
                ], 
                hint: 'use arrows to select'
            }
        ]);            
        switch(menu.text) {
            case true:
                fs2.emptyDirSync(results_folder);
                resolve("Ok");
                break;
            case false:
                console.clear();
                logo();
                console.log('$'.cyan, ` Okay, skipping...`.cyan);
                setTimeout(() => {
                    resolve("Ok")
                }, 1000);
                break;
            default:
                console.clear();
                logo();
                console.log(` ${`Error`.bgRed}${ ` Invalid number`.cyan}`);
                console.log('');
                break;                
        }
    });
}

function text_show() {
    return new Promise((resolve, reject) => {
    logo();
    console.log('$'.cyan, 'Looking for next requests:');
    console.log('');
    fs.readFile('requests.txt', 'utf8', function(err, data) {
        const zapros = data.toString().split('\n').toString().split('\r,');
        console.log('', zapros);
        console.log('');
        console.log('');
        resolve("Ok");
        });
    });
}

async function copyFile(request, result, check_folder) {
    try {
       await fs2.copy(`${check_folder}/${result}/`, `results/${request}/${result}/`)
       console.log(` [${request}]`, `${result}`.brightCyan, `is saved`.yellow)
     } 
     
     catch (err) {
       console.error(err)
    }
 }

function main() {
    return new Promise(async (resolve, reject) => {
        const mainaction = await prompts([
            {
                type: 'select',
                name: 'text',
                message: 'Which format of saving results?',
                choices: [
                    { title: '1. Save full log per request', value: 1 },
                    { title: '2. Save only passwords per request', value: 2 },
                    { title: '3. Collect each request to one file', value: 3 }
                ],
                hint: 'use arrows to select'
            }
        ]);
        console.clear();
        logo();
        console.log('$'.cyan, ` ${`Your choice is: `}${mainaction.text}`)
        console.log('');
        console.log('');
        console.log('', 'Sorting...'.black.bgWhite)
        switch(parseInt(mainaction.text)) {
            case 1:
                setTimeout(async () => {
                    // randomshit();
                    console.log('')
                    const content = fs.readFileSync('requests.txt');
                    const zapros = content.toString().split('\n').map(a => a.trimEnd());
                    let zxcfiles = glob.sync(`${check_folder}/**/**/*assword*.txt`);
                    for (folderpath of zxcfiles) {
                        let data = fs.readFileSync(folderpath, 'utf8');
                        for (request of zapros) {
                            if(data.includes(request)) {
                                let tempstring = folderpath.split(`${check_folder}/`)[1];
                                let result = tempstring.substring(0, tempstring.search('/'));
                                await copyFile(request, result, check_folder);
                            }
                        }
                    }
                    
                    setTimeout(() => {
                        console.log('');
                        console.log('$'.cyan,' Thanks for using. If you have any questions ask me in TG:',' @avelou_work '.black.bgCyan);
                        console.log('');
                    }, 1000);                    
                }, 1000);
                break;
            case 2:
                logo();
                console.log('');
                console.log(`
                ───────────────────────────────────────
                ───▐▀▄───────▄▀▌───▄▄▄▄▄▄▄─────────────
                ───▌▒▒▀▄▄▄▄▄▀▒▒▐▄▀▀▒██▒██▒▀▀▄──────────
                ──▐▒▒▒▒▀▒▀▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄────────
                ──▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▒▒▒▒▒▒▒▒▀▄──────
                ▀█▒▒▒█▌▒▒█▒▒▐█▒▒▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌─────
                ▀▌▒▒▒▒▒▒▀▒▀▒▒▒▒▒▒▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐───▄▄
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌▄█▒█
                ▐▒▒▒▒▒▒▒▒  ${`In developing`.brightRed}  ▒▒▒▒▒▒▒▒▒█▒█▀─
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▀───
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌────
                ─▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐─────
                ─▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌─────
                ──▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐──────
                ──▐▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▌──────
                ────▀▄▄▀▀▀▀▀▄▄▀▀▀▀▀▀▀▄▄▀▀▀▀▀▄▄▀────────
                `);
                console.log('');
                console.log('');
                console.log('$'.cyan,' If you want to add some new features ask me in TG:',' @avelou_work '.black.bgCyan);
                console.log('');
                console.log('');
                break;
            case 3:
                logo();
                console.log('');
                console.log(`
                ───────────────────────────────────────
                ───▐▀▄───────▄▀▌───▄▄▄▄▄▄▄─────────────
                ───▌▒▒▀▄▄▄▄▄▀▒▒▐▄▀▀▒██▒██▒▀▀▄──────────
                ──▐▒▒▒▒▀▒▀▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄────────
                ──▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▒▒▒▒▒▒▒▒▀▄──────
                ▀█▒▒▒█▌▒▒█▒▒▐█▒▒▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌─────
                ▀▌▒▒▒▒▒▒▀▒▀▒▒▒▒▒▒▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐───▄▄
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌▄█▒█
                ▐▒▒▒▒▒▒▒▒  ${`In developing`.brightRed}  ▒▒▒▒▒▒▒▒▒█▒█▀─
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▀───
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌────
                ─▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐─────
                ─▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌─────
                ──▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐──────
                ──▐▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▌──────
                ────▀▄▄▀▀▀▀▀▄▄▀▀▀▀▀▀▀▄▄▀▀▀▀▀▄▄▀────────
                `);
                console.log('');
                console.log('');
                console.log('$'.cyan,' If you want to add some new features ask me in TG:',' @avelou_work '.black.bgCyan);
                console.log('');
                console.log('');
                break;
            default:
                logo();
                console.log('');
                console.log(`
                ───────────────────────────────────────
                ───▐▀▄───────▄▀▌───▄▄▄▄▄▄▄─────────────
                ───▌▒▒▀▄▄▄▄▄▀▒▒▐▄▀▀▒██▒██▒▀▀▄──────────
                ──▐▒▒▒▒▀▒▀▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄────────
                ──▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▒▒▒▒▒▒▒▒▀▄──────
                ▀█▒▒▒█▌▒▒█▒▒▐█▒▒▒▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌─────
                ▀▌▒▒▒▒▒▒▀▒▀▒▒▒▒▒▒▀▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐───▄▄
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌▄█▒█
                ▐▒▒▒▒▒▒▒▒  ${`Invalid Number`.brightRed}  ▒▒▒▒▒▒▒▒▒█▒█▀─
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█▀───
                ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌────
                ─▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐─────
                ─▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌─────
                ──▌▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐──────
                ──▐▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▌──────
                ────▀▄▄▀▀▀▀▀▄▄▀▀▀▀▀▀▀▄▄▀▀▀▀▀▄▄▀────────
                `);
                console.log('');
                console.log('');
                break;

            }
    });
}

logo();
clear_prev().then(async(result1) => {
    if (result1 == "Ok") {
        console.clear();
        text_show().then(async(result2) => {
            if (result2 == "Ok") {
                main();
            }
        });
    }
});
