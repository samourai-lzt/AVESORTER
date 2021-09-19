const fs = require('fs');
const fs2 = require('fs-extra');
const colors = require('colors');
const glob = require('fast-glob');
const prompts = require('prompts');

const langlist = require('./../lang.json');
const check_folder = './logs';
const results_folder = './results';
let files = glob.sync(`./logs/**/Discord/**/*.l**`);
let files2 = glob.sync(`./logs/**/Discord/*okens.txt`);
let version = "0.5";

let cryptofolders = ["Crypto Wallet", "Crypto Wallets", "Coins", "cryptocurrency", "Wallets", "coldwallets", "crypto"];
let zxc = [];

let lang = false;

module.exports = {
    setlang: function (lang_select) {
        lang = lang_select;
    },

    logo: function () {
        console.clear();
        console.log('');
        console.log(`${`  ██████████████████████████████████████████████████████ `.brightBlue} ${`v`.grey}${version.grey}`);
        console.log(`${`  ██▀▄─██▄─█─▄█▄─▄▄─█─▄▄▄▄█─▄▄─█▄─▄▄▀█─▄─▄─█▄─▄▄─█▄─▄▄▀█ `.brightBlue} ${` reborn `.bgRed.white}`);
        console.log(`${`  ██─▀─███▄▀▄███─▄█▀█▄▄▄▄─█─██─██─▄─▄███─████─▄█▀██─▄─▄█ `.brightBlue}`);
        console.log(`${`  ▀▄▄▀▄▄▀▀▀▄▀▀▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▄▀▄▄▀▄▄▀▀▄▄▄▀▀▄▄▄▄▄▀▄▄▀▄▄▀ `.brightBlue}`);
        console.log('');
    },

    dev_logo: function () {
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

    clear_prev: function () {
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
                    hint: langlist[lang][8]
                }
            ]);

            switch (menu.text) {
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

    text_show: function () {
        return new Promise((resolve, reject) => {
            this.logo();
            console.log('$'.cyan, langlist[lang][6]);
            console.log('');
            fs.readFile('requests.txt', 'utf8', function (err, data) {
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
            await fs2.copy(`${check_folder}/${result}/`, `results/${request}/${result}/`);
            console.log(` [${request}]`, `${result}`.cyan, langlist[lang][7].brightGreen);
        }
        catch (err) {
            console.error(err)
        }
    },

    crypto: function () {
        return new Promise(async (resolve, reject) => {
            let invalid = 0;
            for (cryptofolder of cryptofolders) {
                let data = glob.sync(`${check_folder}/**/**/${cryptofolder}`, { onlyFiles: false });
                if (data == "") {
                    invalid++
                    if (invalid == cryptofolders.length) {
                        console.log(` [Crypto]`, ` ${langlist[lang][34]}${langlist[lang][35]}${langlist[lang][33]}`.brightRed);
                        resolve("Ok");
                    }
                }
                for (line of data) {
                    let tempstring = line.split(`${check_folder}/`)[1];
                    let cryptoresult = tempstring.substring(0, tempstring.search('/'));
                    await fs2.copy(`${line}/`, `results/Crypto/${cryptoresult}/`);
                    console.log(` [Crypto]`, `${cryptoresult}`.cyan, langlist[lang][7].brightGreen);
                }
            }
            resolve("Ok");
        });
    },

    discord_ldb: function () {
        return new Promise(async (resolve, reject) => {
        if (!files.length && !files2.length) {
            console.log(` [Discord]`, `${langlist[lang][32] + langlist[lang][33]}`.brightRed);
            resolve("Ok");
        }
        else {
            
                for (let i = 0; i < files.length; i++) {
                    let data = fs.readFileSync(files[i], 'utf-8');
                    var tempdata = (data.indexOf('oken'));
                    var res1 = data.indexOf('"', tempdata);
                    var result_check = data.substr(res1 + 60, 1);
                    if (result_check == '"') {
                        var result = data.substr(res1 + 1, 59);
                        var symbol_check = data.substr(res1 + 1, 1);
                        if (symbol_check.match(/[A-Z^\d]/) !== null) {
                            zxc.push(result);
                        }
                    }
                    else {
                        mfa_result_check = data.substr(res1 + 89, 1);
                        if (mfa_result_check == '"') {
                            var mfa_symbol_check = data.substr(res1 + 1, 3);
                            if (mfa_symbol_check.match('mfa') !== null) {
                                var mfa_result = data.substr(res1 + 1, 88);
                                zxc.push(mfa_result);
                            }
                        }
                    }
                }
                for (let i = 0; i < files2.length; i++) {
                    let data2 = fs.readFileSync(files2[i], 'utf-8');
                    let temping = data2.toString().split('\n').toString().split('\r,');
                    for (temping_sex of temping) {
                        let symbol_check2 = temping_sex.substr(0, 1);
                        if (symbol_check2.match(/([^a-z\s\d])/) !== null) {
                            zxc.push(temping_sex);
                        }

                        else {
                            let mfa_symbol_check2 = temping_sex.substr(0, 3);
                            if (mfa_symbol_check2.match('mfa') !== null) {
                                zxc.push(temping_sex);
                            }
                        }

                        if (!files2.length) {
                            if (!zxc.length) {
                                console.log('');
                                console.log(`$`.cyan, `${langlist[lang][18]}${check_folder}${langlist[lang][19]}`);
                                console.log('');
                                console.log('');
                            }
                        }

                    }
                }
                
        }
        resolve("Ok");
        });
    },

    tokens_filter: function () {
        return new Promise(async (resolve, reject) => {
            var filtered_zxc = zxc.filter(function (el) {
                return el != null;
            });

            uniq_zxc = filtered_zxc.filter(function (item, pos) {
                return filtered_zxc.indexOf(item) == pos;
            })

            for (writing_zxc of uniq_zxc) {
                fs.appendFile(`${results_folder}/Discord/output_tokens.txt`, `${writing_zxc}\n`, function (err) {
                    if (err) {
                        return err;
                    }
                });
                console.log(` [Discord]`, `${writing_zxc}`.cyan, langlist[lang][7].brightGreen);
            }
            resolve("Ok");
        });
    },

    sorter: async function () {
        this.logo();
        console.log('$'.cyan, langlist[lang][6]);
        console.log('');
        const content = fs.readFileSync('requests.txt');
        const zapros = content.toString().split('\n').map(a => a.trimEnd());
        console.log('', zapros);
        console.log('');
        let zxcfiles = glob.sync(`${check_folder}/**/**/*assword*.txt`);
        if (zxcfiles == "") {
            console.log(` [Requests]`, `${langlist[lang][34]}${langlist[lang][36]}${langlist[lang][33]}`.brightRed);
        }
        for (folderpath of zxcfiles) {
            let data = fs.readFileSync(folderpath, 'utf8');
            for (request of zapros) {
                if (data.includes(request)) {
                    let tempstring = folderpath.split(`${check_folder}/`)[1];
                    let result = tempstring.substring(0, tempstring.search('/'));
                    await this.copyFile(request, result, check_folder);
                }
            }
        }
    },

    main: async function () {
        switch (parseInt(1)) {
            case 1:
                console.clear();
                this.logo();
                const mainaction = await prompts([
                    {
                        type: 'multiselect',
                        name: 'text',
                        message: langlist[lang][27],
                        choices: [
                            { title: langlist[lang][28], value: 1 },
                            { title: langlist[lang][29], value: 2 },
                            { title: langlist[lang][30], value: 3 }
                        ],
                        hint: langlist[lang][31],
                        instructions: ""
                    }
                ]);
                console.log('');

                return new Promise(async (resolve, reject) => {
                    if (mainaction.text.includes(1)) {
                        await this.sorter();
                    }
                    if (mainaction.text.includes(2)) {
                        await this.crypto();
                    }
                    if (mainaction.text.includes(3)) {
                        await this.discord_ldb().then(async (res) => {
                            if (res == "Ok") {
                                await this.tokens_filter()
                            }
                        })
                    }
                    resolve("Ok");
                });
        }
    }
}
