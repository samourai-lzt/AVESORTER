const check_folder = './logs';
const fs = require('fs');
const fs2 = require('fs-extra');
const colors = require('colors');
const glob = require('glob');

console.clear();
console.log('');
console.log(' ▄▀█ █ █ █▀▀ █▀ █▀█ █▀█ ▀█▀ █▀▀ █▀█'.yellow);
console.log(' █▀█ ▀▄▀ ██▄ ▄█ █▄█ █▀▄  █  ██▄ █▀▄'.yellow);
console.log(' with luv by samourai lzt <3'.red);
console.log('')

function text_show() {
    console.log('');
    console.log(' Looking for next requests:'.cyan);
    console.log('');
}

function zapros_show() {
    fs.readFile('requests.txt', 'utf8', async function(err, data) {
        const zapros = data.toString().split('\n').toString().split('\r,');
        console.log(zapros)
    });
}

function text_show2() {
    console.log('');
    console.log(' Reading dirs:'.cyan);
    console.log('');
}

function dirs_show() {
    glob(`${check_folder}/**/**/*asswords.txt`, function(err, files) {
        console.log(files);
    });
}

function text_show3() {
    console.log('');
    console.log(' Sorting logs...'.cyan);
    console.log('');
}

async function main() {
    fs.readFile('requests.txt', 'utf8', async function(err, data) {
        const zapros = data.toString().split('\n').toString().split('\r,');
        glob(`${check_folder}/**/**/*asswords.txt`, function(err, files) {
            for (let i = 0; i < files.length; i++) {
                let data = fs.readFileSync(`${files[i]}`, 'utf8');
                zapros.forEach(request => {
                    if(data.includes(request)) {
                        let tempstring = files[i].split(`${check_folder}/`)[1];
                        let result = tempstring.substring(0, tempstring.search('/'));
                        fs2.copy(`${check_folder}/${result}/`, `results/young_prince/${request}/${result}/`, function (err) {
                            if (err) return console.log(err)
                            console.log(` [${request}]`, `${result}`.green, `is saved`.yellow)
                        });
                    }
                });
            }
        });  
    });
    
}

setTimeout(text_show, 1000);
setTimeout(zapros_show, 1200);
setTimeout(text_show2, 2100);
setTimeout(dirs_show, 2300);
setTimeout(text_show3, 2600);
setTimeout(main, 2900);
return 1