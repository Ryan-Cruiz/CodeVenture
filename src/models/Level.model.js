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
        let result = await this.insert('levels', ['lesson_id', 'level_name', 'content','isTask']).
            values([inputs.lesson_id, inputs.title, inputs.description,inputs.isTask]).exec();
        return 'success';


    }
    async getMaterials(id) {
        return await this.select('levels', ["id,lesson_id,level_name"]).where(['lesson_id=?']).values([id]).exec();
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
