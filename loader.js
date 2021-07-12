const colors = require('colors');
const prompts = require('prompts');

const script = require('./src/source');

function lang() {
    return new Promise(async (resolve, reject) => {
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

lang()
