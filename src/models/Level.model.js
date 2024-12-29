const loader = require('../loaders.js');
const model = loader.model;
class Level extends model {
    // Create something 

    async createMaterial(inputs) {
        super.dbConnection();
        let validation = await this.level_validate(inputs);
        if (validation != 'success') {
            return validation;
        }
        console.log(inputs);
        let result = await this.insert('levels', ['lesson_id', 'level_name', 'content', 'isTask']).
            values([inputs.lesson_id, inputs.title, inputs.description, inputs.isTask]).exec();
        return 'success';
    }
    async getLevel(inputs) {
        super.dbConnection();
        let query = await this.select('levels', ["*"]).where(['lesson_id=? AND id=?']).values([inputs.id, inputs.level_id]).exec();
        return query; 
    }
    async getMaterials(id) {
        super.dbConnection();
        let query = await this.select('levels', ["id,lesson_id,level_name"]).where(['lesson_id=?']).values([id]).exec();
        return query 
    }
    async saveTaskAnswers(params, input) {
        super.dbConnection();
        let isUserExist = await this.select("task_answers", ["*"]).where(["user_id=? AND task_id=? AND lesson_id=?"])
            .values([params.user_id, params.level_id, params.id]).exec();
        console.log(isUserExist)
        // console.log('submitted')
        if (isUserExist.length > 0) {
            let result = await this.update('task_answers', ["answers=?", "updated_at=NOW()"])
                .where(["task_id=?", this.and("lesson_id=?"), this.and("user_id=?")])
                .values([JSON.stringify(input), params.level_id, params.id, params.user_id]).exec();
                // console.log(result,'asd')
                this.connection.destroy();
            return 'success';
            // this.profiler_enable();
            // console.log(result);
        } else {
            let result = await this.insert('task_answers', ["answers", "task_id", "lesson_id", "user_id"])
                .values([JSON.stringify(input), params.level_id, params.id, params.user_id]).exec();
                this.connection.destroy();
            // this.profiler_enable();
            // console.log(result,'gsdsdg');
            return 'success';
        }
    }
    async createTask(inputs, content) {
        super.dbConnection();
        if (inputs.isTask == '1' || inputs.isTask != "" || inputs.title != "") {
            let result = await this.insert('levels', ['lesson_id', 'level_name', 'content', 'isTask']).
                values([inputs.lesson_id, inputs.title, content, inputs.isTask]).exec();
                this.connection.destroy();
            return 'success';
        }
        return 'fail';
    }
    async updateTask(inputs, params, content) {
        super.dbConnection();
        if (inputs.isTask == '1' || inputs.isTask != "" || inputs.title != "") {
            let result = await this.update('levels', ['level_name=?', 'content=?', 'updated_at=NOW()']).
                where(['lesson_id=?', this.and('id=?')]).
                values([inputs.title, content, params.lesson_id, params.id]).exec()
            console.log(result);
            this.connection.destroy();
            return 'success';
        }
        this.connection.destroy();
        return 'fail';
    }
    async updateMaterial(inputs, params) {
        let validation = await this.level_validate(inputs);
        if (validation != 'success') {
            return validation;
        }
        super.dbConnection();
        let result = await this.update('levels', ['level_name=?', 'content=?', 'updated_at=NOW()']).
            where(['lesson_id=?', this.and('id=?')]).
            values([inputs.title, inputs.description, params.lesson_id, params.id]).exec()
        console.log(result);
        this.connection.destroy();
        return 'success'
    }
    async getTaskAnswer(params) {
        super.dbConnection();
        let query = await this.select("task_answers", ["*"]).inner('credentials', ['id', 'user_id']).where(["task_id=?", this.and("lesson_id=?")]).values([params.level_id, params.id]).exec();
        this.connection.destroy();
        return query 
    }
    async getUserAnswer(params, user_id) {
        super.dbConnection();
        let query = await this.select("task_answers", ["*"]).where(["user_id=?", this.and("task_id=?"), this.and("lesson_id=?")]).values([user_id, params.level_id, params.id]).exec();
        this.connection.destroy();
        return query 
    }
    async level_validate(inputs) {
        const form = this.Validation;
        form.validate['title'] = { form_data: inputs.title, rules: ['required'] };
        form.validate['description'] = { form_data: inputs.description, rules: ['required'] };
        if (form.run().length > 0) {
            return form.run();
        } else {
            return 'success'
        }
    }
}
module.exports = new Level(); 
