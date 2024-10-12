const loader = require('../loaders.js');
const model = loader.model;
class Level extends model {
    // Create something 

    async createMaterial(inputs) {
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
        return await this.select('levels', ["*"]).where(['lesson_id=? AND id=?']).values([inputs.id, inputs.level_id]).exec();
    }
    async getMaterials(id) {
        return await this.select('levels', ["id,lesson_id,level_name"]).where(['lesson_id=?']).values([id]).exec();
    }
    async createTask(inputs, content) {
        if (inputs.isTask == '1' || inputs.isTask != "" || inputs.title != "") {
            let result = await this.insert('levels', ['lesson_id', 'level_name', 'content', 'isTask']).
                values([inputs.lesson_id, inputs.title, content, inputs.isTask]).exec();
            return 'success';
        }
        return 'fail';
    }
    async updateTask(inputs,params, content) {
        if (inputs.isTask == '1' || inputs.isTask != "" || inputs.title != "") {
            let result = await this.update('levels', ['level_name=?', 'content=?']).
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
        let result = await this.update('levels', ['level_name=?', 'content=?']).
            where(['lesson_id=?', this.and('id=?')]).
            values([inputs.title, inputs.description, params.lesson_id, params.id]).exec()
        console.log(result);
        return 'success'
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
