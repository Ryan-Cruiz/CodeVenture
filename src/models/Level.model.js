const loader = require('../loaders.js');
const model = loader.model;
class Level extends model {
    // Create something 

    async createMaterial(inputs) {

        let validation = await this.level_validate(inputs);
        if (validation != 'success') {
            return validation;
        }
        // console.log(queryLastLessonId, inputs.afterLessonNumber);
        let afterLessonNumber = parseInt(inputs.afterLessonNumber) + 1;
        let queryLastLessonId = await this.select('levels', ['*']).where(['lesson_id=?']).order('order_number', 'ASC').values([inputs.lesson_id]).exec();
        let result = await this.insert('levels', ['lesson_id', 'level_name', 'content', 'isTask', 'order_number']).
            values([inputs.lesson_id, inputs.title, inputs.description, inputs.isTask, ((parseInt(inputs.afterLessonNumber) + 1) || queryLastLessonId.length + 1)]).exec();
        // console.log(result);
        await this.updateOrderNumber(afterLessonNumber, result.insertId, inputs, queryLastLessonId)
        return 'success';
    }
    async updateOrderNumber(afterLessonNumber, id, inputs, queryLastLessonId) {
        // console.log(inputs.afterLessonNumber == "", "sajdkasjdksajdksa", afterLessonNumber == NaN);
        this.dbConnection();
        let queryOutput = "INSERT INTO levels(lesson_id,id,order_number) VALUES ";
        // console.log(afterLessonNumber, queryLastLessonId.length)
        if (inputs.afterLessonNumber == "") {
            return
        }
        let lessonNumber = parseInt(inputs.afterLessonNumber);
        let newNumber = afterLessonNumber + 1;
        for (let i = parseInt(inputs.afterLessonNumber) - 1; i <= queryLastLessonId.length; i++) {
            if (i >= queryLastLessonId.length && id == queryLastLessonId[i - 1].id) {
                // console.log('hwet')
                queryOutput += `(${inputs.lesson_id},${id},${parseInt(inputs.afterLessonNumber) + 1}) ON DUPLICATE KEY UPDATE order_number = VALUES(order_number)`;
            } else if (i >= queryLastLessonId.length) {
                // console.log('hwetasgasgasg', id, queryLastLessonId[i - 1].id, id == queryLastLessonId[i - 1].id)
                if (queryLastLessonId[i - 1].order_number == lessonNumber) {
                    queryOutput += `(${inputs.lesson_id},${queryLastLessonId[i - 1].id},${queryLastLessonId[i - 1].order_number}) ON DUPLICATE KEY UPDATE order_number = VALUES(order_number)`
                } else {
                    queryOutput += `(${inputs.lesson_id},${queryLastLessonId[i - 1].id},${newNumber++}) ON DUPLICATE KEY UPDATE order_number = VALUES(order_number)`
                }
            } else {
                // console.log(newNumber >= queryLastLessonId[i].order_number, newNumber < queryLastLessonId.length + 1, lessonNumber, queryLastLessonId[i].order_number, queryLastLessonId.length, newNumber)
                if (lessonNumber < queryLastLessonId[i].order_number && newNumber < queryLastLessonId.length + 1) {
                    queryOutput += `(${inputs.lesson_id},${queryLastLessonId[i].id},${newNumber++}),`
                    // console.log(queryOutput, 'asdsa');
                }

            }
        }
        let queryRes = await super.Rawquery(queryOutput);
        this.connection.destroy();
        console.log(queryOutput);
    }
    async getLevel(inputs) {

        let query = await this.select('levels', ["*"]).where(['lesson_id=? AND id=?'])
            .values([inputs.id, inputs.level_id]).exec();
        return query;
    }
    async getMaterials(id) {

        let query = await this.select('levels', ["id,lesson_id,level_name,order_number"])
            .where(['lesson_id=?']).order('order_number', 'ASC').values([id]).exec();
        return query
    }
    async saveTaskAnswers(params, input) {

        let isUserExist = await this.select("task_answers", ["*"]).where(["user_id=? AND task_id=? AND lesson_id=?"])
            .values([params.user_id, params.level_id, params.id]).exec();
        console.log(isUserExist)
        // console.log('submitted')
        if (isUserExist.length > 0) {
            let result = await this.update('task_answers', ["answers=?", "updated_at=NOW()"])
                .where(["task_id=?", this.and("lesson_id=?"), this.and("user_id=?")])
                .values([JSON.stringify(input), params.level_id, params.id, params.user_id]).exec();
            // console.log(result,'asd')
            return 'success';
            // this.profiler_enable();
            // console.log(result);
        } else {
            let result = await this.insert('task_answers', ["answers", "task_id", "lesson_id", "user_id"])
                .values([JSON.stringify(input), params.level_id, params.id, params.user_id]).exec();
            // this.profiler_enable();
            // console.log(result,'gsdsdg');
            return 'success';
        }
    }
    async createTask(inputs, content) {

        if (inputs.isTask == '1' || inputs.isTask != "" || inputs.title != "") {
            let queryLastLessonId = await this.select('levels', ['*']).where(['lesson_id=?']).order('order_number', 'ASC').values([inputs.lesson_id]).exec();
            let result = await this.insert('levels', ['lesson_id', 'level_name', 'content', 'isTask', 'order_number']).
                values([inputs.lesson_id, inputs.title, content, inputs.isTask, ((parseInt(inputs.afterLessonNumber) + 1) || queryLastLessonId.length + 1)]).exec();
            let afterLessonNumber = parseInt(inputs.afterLessonNumber) + 1;
            await this.updateOrderNumber(afterLessonNumber, result, inputs, queryLastLessonId);
            return 'success';
        }
        return 'fail';
    }
    async updateTask(inputs, params, content) {

        if (inputs.isTask == '1' || inputs.isTask != "" || inputs.title != "") {
            let result = await this.update('levels', ['level_name=?', 'content=?', 'updated_at=NOW()']).
                where(['lesson_id=?', this.and('id=?')]).
                values([inputs.title, content, params.lesson_id, params.id]).exec()
            console.log(result);
            return 'success';
        }

        return 'fail';
    }
    async updateMaterial(inputs, params) {
        let validation = await this.level_validate(inputs);
        if (validation != 'success') {
            return validation;
        }

        let result = await this.update('levels', ['level_name=?', 'content=?', 'updated_at=NOW()']).
            where(['lesson_id=?', this.and('id=?')]).
            values([inputs.title, inputs.description, params.lesson_id, params.id]).exec()
        // console.log(result);

        return 'success'
    }
    async getTaskAnswer(params) {

        let query = await this.select("task_answers", ["*"]).inner('credentials', ['id', 'user_id']).where(["task_id=?", this.and("lesson_id=?")]).values([params.level_id, params.id]).exec();

        return query
    }
    async getUserAnswer(params, user_id) {

        let query = await this.select("task_answers", ["*"]).where(["user_id=?", this.and("task_id=?"), this.and("lesson_id=?")]).values([user_id, params.level_id, params.id]).exec();

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
