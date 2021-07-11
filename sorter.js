const check_folder = './logs';
const fs = require('fs');
const fs2 = require('fs-extra');
const colors = require('colors');
const glob = require('glob');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function logo() {
    console.clear();
    console.log('');
    console.log(' ▄▀█ █ █ █▀▀ █▀ █▀█ █▀█ ▀█▀ █▀▀ █▀█ testing'.yellow);
    console.log(' █▀█ ▀▄▀ ██▄ ▄█ █▄█ █▀▄  █  ██▄ █▀▄'.yellow);
    console.log(' with luv by samourai lzt <3'.red);
    console.log('')
}

function text_show() {
    return new Promise((resolve, reject) => {
    console.log('');
    console.log(' Looking for next requests:'.cyan);
    console.log('');
    fs.readFile('requests.txt', 'utf8', function(err, data) {
        const zapros = data.toString().split('\n').toString().split('\r,');
        console.log(zapros);
        console.log('');
        resolve("Ok");
        });
    });
}

function main() {
    return new Promise((resolve, reject) => {
        rl.question(`${` Which format of saving results?`.cyan}${`\n\n 1. Save full log per request`.yellow}${`\n 2. Save only passwords per request`.yellow}${`\n 3. Collect each request to one file`.yellow}${`\n\n Answer: `.cyan}`, answer => {
        rl.close()
        switch(parseInt(answer)) {
            case 1:
                console.clear();
                logo();
                console.log(` ${`Your choice is: `.cyan}${answer}`)
                console.log('');
                fs.readFile('requests.txt', 'utf8', function(err, data) {
                    const zapros = data.toString().split('\n').toString().split('\r,');
                    glob(`${check_folder}/**/**/*asswords.txt`, function(err, files) {
                        for (let i = 0; i < files.length; i++) {
                            let data = fs.readFileSync(`${files[i]}`, 'utf8');
                            zapros.forEach(request => {
                                if(data.includes(request)) {
                                    let tempstring = files[i].split(`${check_folder}/`)[1];
                                    let result = tempstring.substring(0, tempstring.search('/'));
                                    fs2.copy(`${check_folder}/${result}/`, `results/${request}/${result}/`, function (err) {
                                        if (err) return console.log(err)
                                        console.log(` [${request}]`, `${result}`.green, `is saved`.yellow)
                                    });
                                }
                            });
                        }
                    });  
                });
                break;
            case 2:
                logo();
                console.log(` ${`Error`.bgRed}${ ` In developing`.cyan}`);
                console.log('');
                break;
            case 3:
                logo();
                console.log(` ${`Error`.bgRed}${ ` In developing`.cyan}`);
                console.log('');
                break;
            default:
                logo();
                console.log(` ${`Error`.bgRed}${ ` Invalid number`.cyan}`);
                console.log('');
                break;
        }
    });
    });
}

logo();
text_show().then(async(result) => {
    if (result == "Ok") {
        main();
    }
})
