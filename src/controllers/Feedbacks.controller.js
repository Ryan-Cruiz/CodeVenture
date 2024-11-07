const loader = require('../loaders.js'); 
const model = loader.core.model; 
const Feedback = model('Feedback');
const Level = model('Level');
const $ = loader.profile; 
class Feedbacks { 
// Create something 
    async index(){
        $.res.locals.lesson_id = $.req.params.lesson_id;
        
        let res = await Feedback.getFeedback($.req.params.lesson_id,$.req.session.user_data.user_id);
        console.log(res);
        if(res.length > 0){
            let listRes = await Level.getMaterials($.req.params.lesson_id);
            let feedbackRes = await Feedback.getFeedbacks($.req.params.lesson_id);
            console.log(feedbackRes);
            $.res.render('feedback/show',{data: feedbackRes,lists: listRes});
        }else{
            $.res.render('feedback/index');
        }
    }
    async add_feedback(){
        let res = await Feedback.createFeedback($.req.body,$.req.params.lesson_id,$.req.session.user_data.user_id);
        console.log(res);
        $.res.redirect(`/material/${$.req.params.lesson_id}/feedback`);
    }
} 
module.exports = new Feedbacks(); 
