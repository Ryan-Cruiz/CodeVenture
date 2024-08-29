
const loader = require('../loaders.js');
const model = loader.core.model;
const $ = loader.profile;
class Users {
    async index() {
        // console.log(res);
        // const res = await car.getAllCars();
        // console.log(res, 'response')
        $.res.render('index'); // render the index page
        $.res.end();
        // console.log('this is a index function');
    }
    async success(){
        if($.req.user){
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