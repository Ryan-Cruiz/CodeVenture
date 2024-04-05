class validation {
    constructor() {
        this.rules = ['required', 'min_length', 'max_length', 'email', 'confirm', 'is_numeric', 'is_char'] // rulesay that check the rules this is just visual for me to look
        this.validate = {};
        /* all of the message will go here in this.validate object
            example
            if you replace something in naming especially on your obj, the chance of getting errors are high
            so stick in form_data,rules inside the validate obj
            obj.validate['your message here'] = 
            {
                form_data: the data req e.g req.body.email or req.query.email,
                rules: pick on the this.rules e.g
            };
        */
    }
    run() {
        //console.log(this.validate);
        //console.log(Object.keys(this.validate));
        let validation_rules = Object.keys(this.validate);
        let error_arr = [];
        let count = 0;
        let key = this.validate;
        // console.log('this is a key of',key);
        for (var x in this.validate) {
            for (let j = 0; j < key[x].rules.length; j++) {
                // console.log('this is in for loop',key[x].rules[j]);
                let length_str = key[x].rules[j].slice(0, key[x].rules[j].length - 3);
                let min_max = key[x].rules[j].slice(11, key[x].rules[j].length - 1);
                if (key[x].rules[j] === 'required' && key[x].form_data === '' || key[x].form_data === undefined) {
                    // console.log('The '+ validation_rules[count] +' must not left empty');
                    error_arr.push('The ' + validation_rules[count] + ' must not left empty');
                }
                if (length_str === 'min_length' && key[x].form_data.length < min_max) {
                    //console.log('Minimum length for '+validation_rules[count]+' is '+min_max +' character(s)');
                    error_arr.push('Minimum length for ' + validation_rules[count] + ' is ' + min_max + ' character(s)');
                }
                if (length_str === 'max_length' && key[x].form_data.length > min_max) {
                    // console.log('Maximum length for '+validation_rules[count]+' is '+min_max +' character(s)');
                    error_arr.push('Maximum length for ' + validation_rules[count] + ' is ' + min_max + ' character(s)');
                }
                if (key[x].rules[j] === 'email') {
                    if (this.search(key[x].form_data, '@') === -1) {
                        // console.log('The '+validation_rules[count]+' is need to be valid email');
                        error_arr.push('The ' + validation_rules[count] + ' is need to be valid email');
                    }
                }
                if (this.replace(key[x].rules[j], 7) === 'confirm' && this.validate[key[x].rules[j].slice(8, key[x].rules[j].length - 1)].form_data != key[x].form_data) {
                    // console.log('The '+validation_rules[count]+' is need to be same as '+key[x].rules[j].slice(8, key[x].rules[j].length - 1));
                    error_arr.push('The ' + validation_rules[count] + ' is need to be same as ' + key[x].rules[j].slice(8, key[x].rules[j].length - 1));
                }
                if (key[x].rules[j] === 'is_numeric' && this.is_numeric(key[x].form_data) === false) {
                    error_arr.push('The ' + validation_rules[count] + ' only need numbers');
                }
                if (key[x].rules[j] === 'is_char' && this.is_numeric(key[x].form_data) === true) {
                    error_arr.push('The ' + validation_rules[count] + ' only need characters');
                }

            }
            count++;
        }
        return error_arr;
    }
    search(form_data, string) {
        for (let i = 0; i < form_data.length; i++) {
            if (form_data[i] === string) {
                return i;
            }
        }
        return -1;
    }
    replace(form_data, characters) {
        var string = '';
        for (let i = 0; i < characters; i++) {
            string += form_data[i];
        }
        return string;
    }
    is_numeric(form_data) {
        for (let i = 0; i < form_data.length; i++) {
            if (!isNaN(form_data[i])) {
                //console.log(form_data[i]);
                return true;
            }
        }
        return false;
    }
}
module.exports = new validation();