const loader = require('../loaders.js');
const model = loader.model;
class Platform extends model {
    // Create something 
    async create_lesson(inputs, role_id) {
        let validation = await this.lesson_validate(inputs);
        if (validation == 'success') {
            let lessonQuery = this.insert('lessons', ['role_id', 'title', 'description',]).
                values([role_id, inputs.title, inputs.description]).exec();
            return 'success';
        }
        return validation;

    }
    async edit_lesson(inputs) {
        let validation = await this.lesson_validate(inputs);
        if (validation == 'success') {
            let lessonQuery = this.update('lessons', ['title=?', 'description=?']).
                where(["id=?"]).
                values([inputs.title, inputs.description,inputs.lesson_id]).exec();
                // console.log(lessonQuery);
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
