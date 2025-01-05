const loader = require('../loaders.js');
const model = loader.model;
class Platform extends model {
    // Create something 
    async create_lesson(inputs, role_id) {

        let validation = await this.lesson_validate(inputs);
        if (validation == 'success') {
            let lessonQuery = await this.insert('lessons', ['role_id', 'title', 'description','img_link']).
                values([role_id, inputs.title, inputs.description,inputs.img_link]).exec();
            return 'success';
        }

        return validation;

    }
    async getLessonTitle(id){
        let lessonTitle = await this.select('lessons',['title']).where(['id=?']).values([id]).exec();
        return lessonTitle 
    }
    async getUserTaskHistory(inputs,user_id){
        let queryTaskHistory = await this.select('task_answers',['task_answers.*','credentials.first_name','credentials.last_name'])
        .left('credentials',['user_id','user_id'])
        .where(['lesson_id=?',this.and('task_id=?'),this.and('task_answers.user_id=?')])
        .values([inputs.id,inputs.level_id,user_id]).exec();
        return queryTaskHistory;
    }
    async edit_lesson(inputs) {

        let validation = await this.lesson_validate(inputs);
        if (validation == 'success') {
            let lessonQuery = await this.update('lessons', ['title=?', 'description=?','img_link=?', 'updated_at=NOW()']).
                where(["id=?"]).
                values([inputs.title, inputs.description,inputs.img_link, inputs.lesson_id]).exec();
            console.log(lessonQuery);
            return 'success';
        }

        return validation;
    }
    async getLessons() {

        // let query = this.sql.format("SELECT * FROM credentials INNER JOIN roles ON credentials.user_id = roles.user_id INNER JOIN groups ON groups.role_id = roles.id");
        let result = await this.select('roles', ["*"]).inner('credentials', ['user_id', 'user_id']).inner('lessons', ['role_id', 'id']).exec()
        // let result = await super.Rawquery(query);
        // console.log(result);
        // console.log();

        return result;
    }
    async lesson_validate(inputs) {
        const form = this.Validation;
        form.validate['title'] = { form_data: inputs.title, rules: ['required'] };
        form.validate['description'] = { form_data: inputs.description, rules: ['required', 'max_length[255]'] };
        if (form.run().length > 0) {
            return form.run();
        } else {
            return 'success'
        }
    }
}
module.exports = new Platform(); 
