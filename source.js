const fs = require('fs');
const fs2 = require('fs-extra');
const colors = require('colors');
const glob = require('glob');
const prompts = require('prompts');

const langlist = require('./../lang.json');
const check_folder = './logs';
const results_folder = './results';
let lang = false;

module.exports = {
	setlang: function(lang_select) {
        lang = lang_select;
    },

    logo: function() {
        console.clear();
        console.log('');
        console.log(`${`  ▄▀█ █ █ █▀▀ █▀ █▀█ █▀█ ▀█▀ █▀▀ █▀█ `.brightBlue}${langlist[lang][0].brightYellow}`);
        console.log(`${`  █▀█ ▀▄▀ ██▄ ▄█ █▄█ █▀▄  █  ██▄ █▀▄ `.brightBlue}${langlist[lang][1].brightRed}`);
        console.log('');
        console.log('');
    },

    dev_logo: function() {
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
        ▐▒▒▒▒▒▒▒▒ ${langlist[lang][2].brightRed} ▒▒▒▒▒▒▒▒▒█▒█▀─
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
    },

    clear_prev: function() {
        return new Promise(async (resolve, reject) => {
            const menu = await prompts([
                {
                    type: 'select',
                    name: 'text',
                    message: langlist[lang][11],
                    choices: [
                        { title: langlist[lang][9], value: true },
                        { title: langlist[lang][10], value: false }
                    ], 
                    hint:  langlist[lang][8]
                }
            ]);

            switch(menu.text) {
                case true:
                    fs2.emptyDirSync(results_folder);
                    resolve("Ok");
                    break;
                case false:
                    console.clear();
                    this.logo();
                    console.log('$'.cyan, langlist[lang][3]);
                    setTimeout(() => {
                        resolve("Ok")
                    }, 1000);
                    break;
                default:
                    console.clear();
                    this.logo();
                    console.log(` ${langlist[lang][4].bgRed}${langlist[lang][5].cyan}`);
                    console.log('');
                    break;                
            }
        });
    },
    
    text_show: function() {
        return new Promise((resolve, reject) => {
        this.logo();
        console.log('$'.cyan, langlist[lang][6]);
        console.log('');
        fs.readFile('requests.txt', 'utf8', function(err, data) {
            const zapros = data.toString().split('\n').toString().split('\r,');
            console.log('', zapros);
            console.log('');
            console.log('');
            resolve("Ok");
            });
        });
    },
    
    copyFile: async function (request, result, check_folder) {
        try {
           await fs2.copy(`${check_folder}/${result}/`, `results/${request}/${result}/`)
           console.log(` [${request}]`, `${result}`.cyan, langlist[lang][7].brightGreen)
        } 
         
        catch (err) {
            console.error(err)
        }
    },
    
    main: function () {
        return new Promise(async (resolve, reject) => {
            const mainaction = await prompts([
                {
                    type: 'select',
                    name: 'text',
                    message: langlist[lang][12],
                    choices: [
                        { title: langlist[lang][13], value: 1 },
                        { title: langlist[lang][14], value: 2 },
                        { title: langlist[lang][15], value: 3 }
                    ],
                    hint: langlist[lang][8]
                }
            ]);
            console.clear();
            this.logo();
            console.log('$'.cyan, ` ${langlist[lang][16]}${mainaction.text}`)
            console.log('');
            console.log('');
            console.log('', langlist[lang][17].black.bgWhite);
            
            switch(parseInt(mainaction.text)) {
                case 1:
                    setTimeout(async () => {
                        // randomshit();
                        console.log('')
                        const content = fs.readFileSync('requests.txt');
                        const zapros = content.toString().split('\n').map(a => a.trimEnd());
                        let zxcfiles = glob.sync(`${check_folder}/**/**/*assword*.txt`);
                        if (parseInt(zxcfiles.length) <= 0) {
                            console.log('');
                            console.log(`$`.cyan, `${langlist[lang][18]}${check_folder}${langlist[lang][19]}`);
                            console.log('');
                            console.log('');
                        }
                        else {
                            for (folderpath of zxcfiles) {
                                let data = fs.readFileSync(folderpath, 'utf8');
                                for (request of zapros) {
                                    if(data.includes(request)) {
                                        let tempstring = folderpath.split(`${check_folder}/`)[1];
                                        let result = tempstring.substring(0, tempstring.search('/'));
                                        await this.copyFile(request, result, check_folder);
                                    }
                                }
                                
                            }

                            setTimeout(() => {
                                console.log('');
                                console.log('');
                                console.log('$'.cyan, langlist[lang][22], langlist[lang][20].black.bgCyan);
                                console.log('');
                                console.log('');
                            }, 1000);   
                        }                 
                    }, 1000);
                    break;
                case 2:
                    this.logo();
                    this.dev_logo();
                    console.log('$'.cyan, langlist[lang][21], langlist[lang][20].black.bgCyan);
                    console.log('');
                    console.log('');
                    break;
                case 3:
                    this.logo();
                    this.dev_logo();
                    console.log('$'.cyan, langlist[lang][21], langlist[lang][20].black.bgCyan);
                    console.log('');
                    console.log('');
                    break;
                default:
                    this.logo();
                    this.dev_logo();
                    break;
                }
        });
    }
}