const loader = require('../loaders.js');
const model = loader.core.model;
const Platform = model("Platform");
const $ = loader.profile;
class Levels {
    async new_material(){
        $.res.render('level/addLevel');
    }
    async create_material() {
        
    }
    async create_task() {
        
    }
    async new_task() {
        $.res.render('level/addTaskLevel');
    }
    async edit_level() {

    }
}
module.exports = new Levels(); 
