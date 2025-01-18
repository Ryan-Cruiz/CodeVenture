const loader = require('../loaders.js')
const model = loader.model
class Code extends model {
    // Create something 
    async createCode(inputs, content, lesson_id) {
        let validation = await this.level_validate(inputs)
        if (validation != 'success') {
            return validation
        }
        // let query = this.sql.format("INSERT INTO levels(lesson_id,level_name,content,isTask) VALUES(?,?,?,?)",
        //     [lesson_id, inputs.title, content, inputs.isTask]
        // )
        // let result = await super.Rawquery(query)
        // 
        let afterLessonNumber = parseInt(inputs.afterLessonNumber) + 1;
        let queryLastLessonId = await this.select('levels', ['*']).where(['lesson_id=?']).order('order_number', 'ASC').values([lesson_id]).exec();
        let result = await this.insert('levels', ['lesson_id', 'level_name', 'content', 'isTask', 'order_number', 'isEnabled']).
            values([lesson_id, inputs.title, content, inputs.isTask, ((parseInt(inputs.afterLessonNumber) + 1) || queryLastLessonId.length + 1), inputs.isEnabled]).exec();
        console.log(result, lesson_id, queryLastLessonId.length);
        await this.updateOrderNumber(afterLessonNumber, result.insertId, inputs, queryLastLessonId)
        return 'success';
    }
    async updateCode(inputs, content, level_id) {
        let validation = await this.level_validate(inputs)
        if (validation != 'success') {
            return validation
        }
        // 
        let result = await this.update('levels', ['level_name=?', 'content=?', 'updated_at=NOW()']).
            where(['id=?']).values([inputs.title, content, level_id]).exec()
        console.log(result)

        return 'success'
    }
    async updateOrderNumber(afterLessonNumber, id, inputs, queryLastLessonId) {
        // console.log(inputs.afterLessonNumber == "", "sajdkasjdksajdksa", afterLessonNumber == NaN);
        let queryOutput = "INSERT INTO levels(lesson_id,id,order_number) VALUES ";
        if (inputs.afterLessonNumber == "" || afterLessonNumber == NaN) {
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
        console.log(queryOutput);
        let queryRes = await super.Rawquery(queryOutput);
    }

    async level_validate(inputs) {
        const form = this.Validation
        form.validate['title'] = { form_data: inputs.title, rules: ['required'] }
        form.validate['description'] = { form_data: inputs.description, rules: ['required'] }
        form.validate['functionName'] = { form_data: inputs.functionName, rules: ['required'] }
        form.validate['testCases[]'] = { form_data: inputs.testCases, rules: ['required'] }
        form.validate['testCasesAnswer[]'] = { form_data: inputs.testCasesAnswer, rules: ['required'] }
        if (form.run().length > 0) {
            return form.run()
        } else {
            return 'success'
        }
    }
}
module.exports = new Code() 
