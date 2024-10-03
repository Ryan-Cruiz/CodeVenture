const loader = require('../loaders.js');
const model = loader.core.model;
const Platform = model("Platform");
const Level = model("Level");
const $ = loader.profile;
class Platforms {
    // Create something
    async index() {
        $.res.locals.lesson_id = $.req.params.id;
        // console.log($.res.locals)
        let materials_res = await Level.getMaterials($.req.params.id);
        // console.log(materials_res);
        $.res.render('platform/index',{data: materials_res});
    }
    /**LESSON */
    async create_lesson() {
        // $.res.render('platform/createLesson');
        let res = await Platform.create_lesson($.req.body,$.req.session.user_data.user_id);
        if (res == 'success') {
            $.req.session.msg = { success: ["Lesson Created Successfully!"] };
            $.res.redirect('/');
        }else{
            $.req.session.msg = { error: res };
        }
        // console.log($.req.body);
    }
    async edit_lesson(){

    }
    /**END OF LESSON */
}
module.exports = new Platforms(); 
