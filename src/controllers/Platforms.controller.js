const loader = require('../loaders.js');
const model = loader.core.model;
const Platform = model("Platform");
const $ = loader.profile;
class Platforms {
    // Create something
    async index() {
        // $.res.send($.req.params.id);
        $.res.render('platform/index')
    }
    async test() {
        $.res.send($.req.params.id);
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
