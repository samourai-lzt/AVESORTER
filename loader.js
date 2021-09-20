const colors = require('colors');
const prompts = require('prompts');
const glob = require('glob');
const fs = require('fs');
const fs2 = require('fs-extra');

let dirs = ['results', 'logs', 'src'];

function lang() {
    return new Promise(async (resolve, reject) => {
        const script = require('./src/source');
        console.clear();
        script.setlang("EN");
        script.logo();
        const lang_choose = await prompts([
            {
                type: 'select',
                name: 'text',
                message: 'Your language is',
                choices: [
                    { title: 'English', value: "EN" },
                    { title: 'Russian', value: "RU" },
                    { title: 'Deutsche', value: "DE" }
                ],
                hint: 'use arrows to select'
            }
        ]);
        script.setlang(lang_choose.text);
        script.logo();
        script.clear_prev().then(async (result1) => {
            if (result1 == "Ok") {
                console.clear();
                script.text_show().then(async (result2) => {
                    if (result2 == "Ok") {
                        script.main().then(async (resultm) => {
                            if (resultm == "Ok") {
                                console.log("");
                            }
                        });
                    }
                });
            }
        });
    });
}

function check_folders() {
    return new Promise(async (resolve, reject) => {
        console.clear();
        setTimeout(() => {
            console.log('$'.cyan, ` Checking/creating requied dirs...`);
            console.log('');
            setTimeout(() => {
                for (const dirs_check of dirs) {
                    if (glob.sync(`./${dirs_check}`) != `./${dirs_check}`) {
                        console.log(` [${dirs_check}]`, `${`not found`.cyan} so it was ${`created`.green}`);
                        fs.mkdirSync(`./${dirs_check}`);
                    }
                    else {
                        console.log(` [${dirs_check}]`, `${`is OK`.green}`);
                    }
                }
                console.log();
                resolve("Ok");
            }, 250);
        }, 250);
    })
}

check_folders().then(async (result3) => {
    if (result3 == "Ok") {
        if (fs2.existsSync(`./src/source.js`) == false) {
            console.log('$'.cyan, ` Replacing source.js file...`);
            console.log('');
            setTimeout(() => {
                try {
                    fs2.moveSync(`./source.js`, `./src/source.js`);
                    if (fs2.existsSync(`./src/source.js`)) {
                        console.log(` [source.js]`, `is OK`.green);
                    }
                }
                catch (err) {
                    console.log(` ${'Error while replacing source.js, file not found'.white.bgRed}\n`)
                }
            }, 500);
        }
        if (fs2.existsSync(`./requests.txt`) == false) {
            console.log('$'.cyan, ` Creating requests file...`);
            fs.appendFileSync(`requests.txt`, "");
            if (fs2.existsSync(`./requests.txt`)) {
                console.log(`\n [requests.txt]`, `is OK`.green);
                setTimeout(() => {
                    lang();
                }, 1000);
            }
        }
        else {
            setTimeout(() => {
                lang();
            }, 500);
        }
    }
});
