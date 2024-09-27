const loader = require('../loaders.js');
const model = loader.model;
class Level extends model {
    // Create something 

    async createLevel() {
        
    }
    async getLevels(id) {
        let result = await this.select('levels', ["*"]).where(['lesson_id=?']).values([id]).exec();
    }

    async level_validate(inputs) {
        const form = this.Validation;
        form.validate['title'] = { form_data: inputs.title, rules: ['required'] };
        form.validate['description'] = { form_data: inputs.description, rules: ['required'] };
        form.validate['isLesson'] = { form_data: inputs.isLesson, rules: ['required'] };
        if (form.run().length > 0) {
            return form.run();
        } else {
            return 'success'
        }
    }
}
module.exports = new Level(); 
