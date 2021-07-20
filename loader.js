const colors = require('colors');
const prompts = require('prompts');
const glob = require('glob');
const fs = require('fs');
const fs2 = require('fs-extra');

let dir = `${glob.sync(`./results`)}`;
let dirs = ['results', 'logs', 'src'];
let check = [];

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
                    { title: 'ENG', value: "EN" },
                    { title: 'RUS', value: "RU" }
                ], 
                hint: 'use arrows to select'
            }
        ]);           
		script.setlang(lang_choose.text);
        script.logo();     
        script.clear_prev().then(async(result1) => {
            if (result1 == "Ok") {
                console.clear();
                script.text_show().then(async(result2) => {
                    if (result2 == "Ok") {
                        script.main();
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
                for(const dirs_check of Object.values(dirs)) {
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
            }, 500);    
        }, 500);
    })
}

check_folders().then(async(result3) => {
    if (result3 == "Ok") {
        if (fs2.existsSync(`./src/source.js`) == false) {
            console.log('$'.cyan, ` Replacing source.js file...`);
            console.log('');
            setTimeout(() => {
                fs2.moveSync(`./source.js`, `./src/source.js`);
                if (fs2.existsSync(`./src/source.js`)) {
                    console.log(` [source.js]`, `is OK`.green);
                    setTimeout(() => {
                        lang();
                    }, 100);
                }
                else {
                    console.log(` ${'Error while replacing source.js'.white.bgRed}`);
                }
            }, 500);           
        }
        else {
            setTimeout(() => {
                lang();
            }, 500);
        }
    }
});
