const loader = require('../loaders.js');
const model = loader.model;
class Code extends model {
    // Create something 
    async createCode(inputs, content, lesson_id) {
        let validation = await this.level_validate(inputs);
        if (validation != 'success') {
            return validation;
        }
        // let query = this.sql.format("INSERT INTO levels(lesson_id,level_name,content,isTask) VALUES(?,?,?,?)",
        //     [lesson_id, inputs.title, content, inputs.isTask]
        // );
        // let result = await super.Rawquery(query);
        super.dbConnection();
        let result = await this.insert('levels', ['lesson_id', 'level_name', 'content', 'isTask']).
            values([lesson_id, inputs.title, content, inputs.isTask]).exec();
        console.log(result)
        this.connection.destroy();
        return 'success';
    }
    async updateCode(inputs, content, level_id) {
        let validation = await this.level_validate(inputs);
        if (validation != 'success') {
            return validation;
        }
        super.dbConnection();
        let result = await this.update('levels', ['level_name=?', 'content=?', 'updated_at=NOW()']).
            where(['id=?']).values([inputs.title, content, level_id]).exec();
        console.log(result)
        this.connection.destroy();
        return 'success';
    }


    async level_validate(inputs) {
        const form = this.Validation;
        form.validate['title'] = { form_data: inputs.title, rules: ['required'] };
        form.validate['description'] = { form_data: inputs.description, rules: ['required'] };
        form.validate['functionName'] = { form_data: inputs.functionName, rules: ['required'] };
        form.validate['testCases[]'] = { form_data: inputs.testCases, rules: ['required'] };
        form.validate['testCasesAnswer[]'] = { form_data: inputs.testCasesAnswer, rules: ['required'] };
        if (form.run().length > 0) {
            return form.run();
        } else {
            return 'success';
        }
    }
}
module.exports = new Code(); 
