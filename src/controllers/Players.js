/* 
Little Reminder for myself:
You can name anything you want, however it might cause a confusion. 
NAME YOUR CLASS SAME NAME ON FILE LIKE CI 
import the model by using
model_obj = new config.model('model name/.js');
*/
// const { profile } = require('../loaders.js');
const loader = require('../loaders.js');
const model = loader.core.model;
const $ = loader.profile;
const car = model('Car');
class Players {
    constructor() {
        this.result = []; // this is to catch the result in database errors
    }

    /* the index page file */
    async index() {
        // console.log(res);
        const res = await car.getAllCars();
        console.log(res, 'response')
        $.res.render('user/index'); // render the index page
        $.res.end();
        console.log('this is a index function');
    }

    async getCars() {
        // console.log('call from app', $.appServiceRole, $);
        const res  = await car.getAllCars();
        $.res.send(res,'awea');
    }
    async insertCar() {
        console.log('reached');
        const name = $.req.body.name;
        const brand = $.req.body.brand;
        const res = await car.insertCar(name, brand);
        console.log(res);
        $.res.redirect('/');
    }
    async destroy() {
        const res = await car.deleteCar($.req.params.id);
        $.res.send(`DELETE HTTP method on ${'testAPI/' + $.req.params.id} resource`);
        // profile.res.send('delete');
    }
    async wowie() {
        $.res.send('wowie');
    }
}

module.exports = new Players();