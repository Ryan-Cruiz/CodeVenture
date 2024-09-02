const loader = require('../loaders.js');
const model = loader.core.model;
const $ = loader.profile;
class Platforms {
    // Create something
    async index() {
        $.res.send($.req.params.id);
    }
    async test() {
        $.res.send($.req.params.id);
    }
}
module.exports = new Platforms(); 
