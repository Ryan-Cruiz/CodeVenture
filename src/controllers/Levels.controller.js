const loader = require('../loaders.js');
const model = loader.core.model;
const Platform = model("Platform");
const $ = loader.profile;
class Levels {
    async new_level(){
        $.res.render('level/addLevel');
    }
    async create_level() {

    }
    async edit_level() {

    }
}
module.exports = new Levels(); 
