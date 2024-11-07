const loader = require('../loaders.js');
const model = loader.model;
class Feedback extends model {
    // Create something 
    async createFeedback(inputs,lesson_id,user_id) {
        let validation = await this.feedback_validate(inputs);
        if(validation != 'success'){
            return validation;
        }
        // this.profiler_enable();
        // let query = this.sql.format("INSERT INTO feedbacks(content,rate,lesson_id,user_id) VALUES(?,?,?,?)",
        //     [inputs.content,inputs.rate,lesson_id,user_id])
        // let res = await super.Rawquery(query);
        let feedbackQuery = await this.insert('feedbacks',['content','rate','lesson_id','user_id'])
        .values([inputs.content,inputs.rate,lesson_id,user_id]).exec();
        // console.log(res);
        return 'success';
    }
    async feedback_validate(inputs) {
        const form = this.Validation;
        form.validate['content'] = { form_data: inputs.content, rules: ['required'] };
        form.validate['rate'] = { form_data: inputs.rate, rules: ['required'] };
        if (form.run().length > 0) {
            return form.run();
        } else {
            return 'success';
        }
    }
    async getFeedback(lesson_id,user_id){
        return await this.select("feedbacks",["feedbacks.id,feedbacks.user_id,feedbacks.lesson_id"]).inner("lessons",['id',"lesson_id"])
        .inner("users",['id','user_id']).exec();
    }
    async getFeedbacks(lesson_id){
        return await this.select("feedbacks",["feedbacks.*,credentials.first_name,credentials.last_name"])
        .inner("lessons",['id',"lesson_id"]).inner("credentials",['id','user_id']).order('created_at','DESC').exec();
    }
}
module.exports = new Feedback(); 
