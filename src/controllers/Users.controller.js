
const loader = require("../loaders.js");
const model = loader.core.model;
const $ = loader.profile;
const user = model('User');
const Platform = model("Platform");
const config = loader.config;
let error = [];
class Users {

    async index() {
        // console.log(res);
        // const res = await car.getAllCars();
        // console.log(res, 'response')
        // console.log($.req.session)
        if (!$.req.session.logged) {
            $.req.session.logged = false;
            // this.result = [];
            $.res.render('user/index', { result: $.req.session.result });
            // $.res.render('user/index');
        } else {
            // $.res.locals.user_data = {name: "developer", user_id: 27};
            // console.log($.req.app.locals)
            let res = await Platform.getLessons();
            let data = res || [];
            // console.log(data);
            $.res.render('user/dashboard', { user: $.req.session.user_data, lessons: data });
        }
        $.res.end();
        // console.log('this is a index function');
    }
    async login() {
        let result = await user.login_validate($.req.body); // get validate
        // console.log('wiwi',result,$.req.body);
        if (result == 'success') {
            let res = await user.login_process($.req.body); // get the query
            // console.log(data.first_name, 'this is data');
            // console.log(res, 'login res');
            if (res == 'fail') { // check if not
                $.req.session.msg = { error: ['Wrong Password'] }; // get the result as a array of message
                $.res.redirect('/');
                $.res.end();
            } else if (res == 'notexist') {
                $.req.session.msg = { error: ['Invalid Email'] };
                $.res.redirect('/');
                $.res.end();
            } else {
                let data = res[0];
                $.req.session.regenerate(function (err) {
                    if (err) console.log(err);
                    // store user information in session, typically a user id
                    $.req.session.logged = true;
                    $.req.session.user_data = { name: data.first_name, user_id: data.user_id };
                    let roles = new Array(data.roles);
                    $.req.session.roles = ['all', 'auth', ...roles];
                    // save the session before redirection to ensure page
                    // load does not happen before session is saved
                    $.req.session.save(function (err) {
                        if (err)
                            console.log(err)
                        $.res.redirect('/');
                    })
                })
            }
            // console.log($.req.session)
            // $.res.redirect('/')
            // this.result = data; // reference the result to the data and render this.result on result.ejs
        } else {
            $.req.session.msg = { error: result };
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
            let createProcess = await user.create_process($.req.body);
            // console.log(data)
            if (createProcess == 'success') {
                // let data = createProcess[0];
                // $.req.session.logged = true;
                // $.req.session.user_data = { name: data.first_name, user_id: data.user_id };
                // let roles = new Array(data.roles);
                // $.req.session.roles = ['all', 'auth', ...roles];
                $.req.session.msg = { success: ['Successfully Created!'] };
                $.res.redirect('/');
            } else {
                // console.log('failedasdsad')
                $.req.session.msg = { error: ['Email is Taken'] };
                $.res.redirect('/register')
            }
        } else {
            $.req.session.msg = { error: result };
            // this.result = result;
            // $.res.redirect('/');
            $.res.redirect('/register')
        }
    }
    async register() {
        // console.log($.req.session)
        $.res.render('user/create');
    }
    async logOut() {
        // console.log("dsadsad")
        // this.result = [];
        $.req.session.user_data = null
        $.req.session.logged = false
        $.req.session.save(function (err) {
            if (err) next(err)

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            $.req.session.regenerate(function (err) {
                if (err) next(err)
                $.res.redirect('/')
            })
        })
    }
    async settings() {

        $.res.render('user/settings', { config: config.database });
    }

    // for google auth
    async success() {
        if ($.req.user) {
            $.res.redirect('/failure');
        }
        // console.log($.req);
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