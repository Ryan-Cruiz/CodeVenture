const loader = require('../loaders.js');
const model = loader.core.model;
const Level = model("Level");
const $ = loader.profile;
class Levels {
    async new_material(){
        $.res.locals.lesson_id = $.req.params.lesson_id;
        $.res.render('level/addMaterial');
    }
    async create_material() {
        let res = await Level.createMaterial($.req.body)
        if(res != 'fail'){
            console.log(res);
        }
        $.res.redirect('back');
    }
    async create_task() {
        
    }
    async new_task() {
        $.res.render('level/addTask');
    }
    async edit_level() {

    }
    async show_material(){
        $.res.render('level/showLevel');
    }
}
module.exports = new Levels(); 
