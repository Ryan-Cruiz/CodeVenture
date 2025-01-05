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
        let lessonTitle = await Platform.getLessonTitle($.req.params.id);
        $.res.render('platform/index', { data: materials_res, lessonTitle: lessonTitle[0].title });
    }
    /**LESSON */
    async create_lesson() {
        // $.res.render('platform/createLesson');
        let res = await Platform.create_lesson($.req.body, $.req.session.user_data.user_id);
        if (res == 'success') {
            $.req.session.msg = { success: ["Lesson Created Successfully!"] };
            $.res.redirect('/');
        } else {
            $.req.session.msg = { error: res };
            $.res.redirect('/');
        }
        // console.log($.req.body);
    }
    async show_quiz_history() {
        $.res.locals.params = $.req.params;
        console.log($.req.session.user_data)
        let res = await Platform.getUserTaskHistory($.req.params, $.req.session.user_data.user_id)
        $.res.render('platform/showHistory', { data: res })
    }
    async edit_lesson() {
        console.log($.req.body);
        let res = await Platform.edit_lesson($.req.body);
        if (res == 'success') {
            $.req.session.msg = { success: ["Lesson Updated Successfully!"] };
            $.res.redirect('/');
        } else {
            $.req.session.msg = { error: res };
            $.res.redirect('/');
        }
    }
    /**END OF LESSON */
}
module.exports = new Platforms(); 
