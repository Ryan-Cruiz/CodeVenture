const loader = require('../loaders.js');
const model = loader.model;
class User extends model {
    // Create something 
    async login_process(form_input) {
        let result = await this.select('users', ['*']).left('roles', ['user_id', 'id']).inner('credentials', ['user_id', 'id']).where(['email=?']).values([form_input.email.toLowerCase()]).exec();
        console.log(result);
        if (result == undefined) return 'notexist';
        try {
            if (await this.bcrypt.compare(form_input.password, result[0].password) == false) {
                return 'fail';
            }
        } catch (e) {
            console.log(e);
            return 'fail';
        }
        return result;
    }

    async email_validate(form_input) {
        let result = await this.select('users', ['*']).where([`email=?`]).values([form_input.email]).exec();
        // console.log(result)
        // this.profiler_enable();
        if (result.length == 0) {
            return result;
        } else {
            if (form_input.email == result[0].email) {
                return 'fail';
            }
        }
    }

    async create_process(form_input) {
        try{
            let result = await this.email_validate(form_input);
            // console.log(result)
            if (result != 'fail') {
                let hashPass = await this.bcrypt.hash(form_input.password, 10);
                let userQuery = this.insert('users', ['email', 'password']).values([form_input.email.toLowerCase(), hashPass]).exec();
                let lastData = await userQuery;
                // console.log(lastData.insertId, lastData, 'sadksaldksaldksa')
                let credQuery = await this.insert('credentials', ['first_name', 'last_name', 'user_id']).values([form_input.firstName, form_input.lastName, lastData.insertId]).exec();
    
                if (lastData.insertId == 1) {
                    let roleQuery = await this.insert('roles', ['roles', 'user_id',]).values([["admin"].toString(), lastData.insertId]).exec();
                }
    
                return 'success'
            } else {
    
                return 'fail';
            }
        }catch(e){
            console.log(e)
            return 'fail';
        }

    }

    async login_validate(form_input) {
        const form = this.Validation;
        form.validate['email'] = { form_data: form_input.email, rules: ['required', 'email'] };
        form.validate['password'] = { form_data: form_input.password, rules: ['required'] };

        if (form.run().length > 0) {
            return form.run();
        } else {
            this.Validation.validate = {};
            return 'success'
        }
    }

    async create_validate(form_input) {
        const form = this.Validation
        form.validate['first name'] = { form_data: form_input.firstName, rules: ['is_char', 'required'] };
        form.validate['last name'] = { form_data: form_input.lastName, rules: ['is_char', 'required'] };
        form.validate['email'] = { form_data: form_input.email, rules: ['required', 'email'] };
        form.validate['password'] = { form_data: form_input.password, rules: ['required', 'min_length[8]'] };
        form.validate['confirm password'] = { form_data: form_input.password_confirm, rules: ['required', 'min_length[8]', 'confirm[password]'] };
        if (form.run().length > 0) {
            return form.run();
        } else {
            this.Validation.validate = {};
            return 'success';
        }
    }
}
module.exports = new User(); 
