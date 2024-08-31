
const loader = require('../loaders.js');
const model = loader.core.model;
const $ = loader.profile;
const user = model('User');
const config = loader.config;
class Users {
    constructor() {
        this.result = []; // this is to catch the result in database errors
    }
    async index() {
        // console.log(res);
        // const res = await car.getAllCars();
        // console.log(res, 'response')
        console.log($.req.session)
        if (!$.req.session.logged) {
            $.req.session.logged = false;
            // this.result = [];
            // $.res.render('user/index', { result: this.result });
            $.res.render('user/index');
        } else {
            $.res.render('user/dashboard', { user: $.req.session.user_data });
        }
        $.res.end();
        // console.log('this is a index function');
    }
    async login() {
        let result = await user.login_validate($.req.body); // get validate
        // console.log('wiwi',result,$.req.body);
        if (result == 'success') {
            let res = await user.login_process($.req.body); // get the query
            let data = res[0];
            // console.log(data.first_name, 'this is data');
            if (data != 'fail') { // check if not
                $.req.session.logged = true;
                $.req.session.user_data = { name: data.first_name, user_id: data.user_id };
                $.req.session.roles = ['all', 'auth'];
                // console.log($.req.session)
                $.res.redirect('/')
                // this.result = data; // reference the result to the data and render this.result on result.ejs
            } else {
                // this.result = ['Wrong Password']; // get the result as a array of message
            }
        } else {
            // this.result = result;
            $.res.redirect('/');
            $.res.end();
        }
    }
    async createAccount() {
        //check create validate if rules are all correct
        let result = user.create_validate($.req.body);
        // console.log(result)
        if (await result == 'success') {
            // register the user
            let data = await user.create_process($.req.body);
            // console.log(data)
            if (data == 'success') {
                let data = await user.login_process($.req.body); // get the query
                console.log(data);
                if (data != 'fail') { // check if not
                    $.req.session.logged = true;
                    $.req.session.user_data = { name: data.first_name, user_id: data.user_id };
                    $.req.session.roles = ['all', 'auth'];
                    $.res.redirect('/')
                    // this.result = data; // reference the result to the data and render this.result on result.ejs
                } else {
                    // this.result = ['Wrong Password']; // get the result as a array of message
                }
            } else {
                // console.log('failedasdsad')
                // this.result = ['Email is Taken'];
                $.res.redirect('/register');
            }
        } else {
            // this.result = result;
            $.res.redirect('/');
        }
        // $.res.redirect('/register')
    }
    async register() {
        console.log($.req.session)
        $.res.render('user/create');
    }
    async logOut() {
        $.req.session.destroy();
        console.log("dsadsad")
        // this.result = [];
        $.res.redirect('/');
    }
    async settings() {

        $.res.render('user/settings', { config: config.database });
    }

    // for google auth
    async success() {
        if ($.req.user) {
            $.res.redirect('/failure');
        }
        console.log($.req);
        $.res.render('user/dashboard');
        // $.res.send('Success!');
        $.res.end();
    }
    async fail() {
        // console.log(res);
        // const res = await car.getAllCars();
        // console.log(res, 'response')
        $.res.send('fail!'); // render the index page
        $.res.end();
        // console.log('this is a index function');
    }

}
module.exports = new Users();