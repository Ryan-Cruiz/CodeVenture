const loader = require('../loaders.js');
const model = loader.model;
class Car extends model {
    // /* get all players */
    // async get_all(callback) {
    //     // this.profiler_enable();
    //     let query = this.Mysql.format(`SELECT sport_players.id as id,name,gender,img,sport_name FROM sports_played 
    //     INNER JOIN sport_players ON sport_players.id = sports_played.player_id
    //     INNER JOIN sports ON sports.id = sports_played.sport_id`);
    //     let result = await super.query(query);
    //     return callback(result);
    // }
    // /* search specific players */
    // async search_player(form_input, callback) {
    //     // this.profiler_enable();
    //     let query = this.Mysql.format(`SELECT sport_players.id as id,name,gender,img,sport_name FROM sports_played 
    //     INNER JOIN sport_players ON sport_players.id = sports_played.player_id
    //     INNER JOIN sports ON sports.id = sports_played.sport_id WHERE name = ? OR gender IN (?) OR sports.id IN (?)`,
    //         [form_input.player_name, form_input.genders, form_input.sports]);
    //     let result = await super.query(query);
    //     return callback(result);
    // }
    async getAllCars() {
        // this.profiler_enable();
        let result = this.select('cars', ['*']).exec()
        return result;
    }
    async deleteCar(id) {
        this.profiler_enable();
        let query = this.destroy('cars').where([`id = ${id}`]).exec()

        // let result = await super.query(query);
        return result;
    }
    async get_orm() {
        this.select('test_tbl', ['v1', 'v2', 'v3', 'v4']).inner('test_tbl2', ['id', 'user_id']).exec();
    }
    async insertCar(name,brand){
        let query = this.insert('cars',['name','brand'],[name,brand]).exec();
        // console.log(query);
        return query;
    }
}
module.exports = new Car();