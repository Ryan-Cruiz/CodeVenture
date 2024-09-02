const loader = require('../loaders.js');
const model = loader.model;
class User extends model {
    // Create something 

    async insertUser(body) {
        // console.log(query);
        return query;
    }
    async login_process(form_input) {
        let query = this.sql.format('SELECT * FROM users INNER JOIN credentials ON users.id = user_id WHERE email = ?',
            [form_input.email]);
        let result = await super.Rawquery(query);
        // this.profiler_enable();
        console.log(this.bcrypt.compareSync(form_input.password, result[0].password), form_input.password, result[0].password)
        if (!this.bcrypt.compareSync(form_input.password, result[0].password)) {
            return 'fail';
        }
        return result;
    }

    async email_validate(form_input) {
        // let email = this.select('users', ['*']).where(['email = \'' + form_input.email + '\'']).exec();
        let query = this.sql.format('SELECT * FROM users WHERE email = ?', [form_input.email]);
        // console.log(query)
        // return callback('success');
        let result = await super.Rawquery(query);
        // console.log(result)
        this.profiler_enable();
        if (result.length == 0) {
            return result;
        } else {
            if (form_input.email == result[0].email) {
                return 'fail';
            }
        }
    }

    async create_process(form_input) {
        let result = await this.email_validate(form_input);
        console.log(result)
        if (result != 'fail') {
            let userQuery = this.insert('users', ['email', 'password', 'created_at'],
                [form_input.email, this.bcrypt.hashSync(form_input.password, 10), `NOW()`]).exec();
            let lastData = await userQuery;
            // console.log(lastData.insertId, lastData, 'sadksaldksaldksa')
            let credQuery = this.insert('credentials', ['first_name', 'last_name', 'user_id', 'created_at'],
                [form_input.firstName, form_input.lastName, lastData.insertId, `NOW()`]).exec();
            // console.log(credQuery.queries);
            // let credRes = await super.Rawquery(credQuery.queries);
            // let query = this.sql.format(`INSERT INTO 
            // users(first_name,last_name,email,password,created_at) VALUES(?,?,?,?,NOW())`,
            //     [form_input.first_name, form_input.last_name, form_input.email, this.bcrypt.hashSync(form_input.password, 10)]);
            // super.query(query, (result) => { console.log('sucess!'); });
            return 'success'
        } else {
            return 'fail';
        }

    }

    async login_validate(form_input) {
        const form = this.Validation;
        form.validate['email'] = { form_data: form_input.email, rules: ['required', 'email'] };
        form.validate['password'] = { form_data: form_input.password, rules: ['required', 'min_length[8]'] };

        if (form.run().length > 0) {
            return form.run();
        } else {
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
            return 'success';
        }
    }
}
module.exports = new User(); 
