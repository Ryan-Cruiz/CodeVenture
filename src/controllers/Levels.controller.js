const loader = require('../loaders.js');
const model = loader.core.model;
const Level = model("Level");
const $ = loader.profile;
class Levels {
    async new_material() {
        $.res.locals.lesson_id = $.req.params.lesson_id;
        $.res.render('level/addMaterial');
    }
    async create_material() {
        let res = await Level.createMaterial($.req.body)
        let id = $.req.body.lesson_id;
        if (res != 'success') {
            console.log(res);
        }
        $.res.redirect(`lesson/${id}`);
    }
    async create_task() {

    }
    async new_task() {
        $.res.render('level/addTask');
    }
    async edit_level() {
        $.res.locals.lesson_id = $.req.params.lesson_id;
        let res = await Level.getLevel($.req.params);
        $.res.render('level/editMaterial', { data: res });
    }
    async update_level() {
        console.log($.req.body);
        console.log($.req.params)
        let res = await Level.updateMaterial($.req.body, $.req.params)
        if (res != 'success') {
            $.res.redirect('back')
        } else {
            $.res.redirect(`/material/${$.req.params.lesson_id}/level/${$.req.params.id}`);
        }
    }
    async show_material() {
        let res = await Level.getLevel($.req.params);
        console.log(res);
        let listRes = await Level.getMaterials($.req.params.id);
        $.res.render('level/showLevel', { data: res, lists: listRes });
    }
}
module.exports = new Levels(); 
