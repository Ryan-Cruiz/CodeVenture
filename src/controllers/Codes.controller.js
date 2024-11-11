const loader = require('../loaders.js');
const model = loader.core.model;
const $ = loader.profile;
const Code = model("Code");
class Codes {
    // Create something 
    async index() {
        // $.res.render('code/index');

    }
    async new_code() {
        $.res.locals.params = $.req.params;
        $.res.render('code/addCode');
    }
    async create_code() {
        let lesson_id = $.req.params.lesson_id;
        let description = $.req.body.description;
        let functionName = $.req.body.functionName;
        let params = $.req.body.params;
        let testCases = $.req.body.testCases;
        let testCasesAnswer = $.req.body.testCasesAnswer;
        let content = {
            description: description,
            functionName: functionName,
            params: params,
            testCases: testCases,
            testCasesAnswer: testCasesAnswer
        };
        console.log($.req.body);
        let res = await Code.createCode($.req.body,JSON.stringify(content),lesson_id);
        if(res != 'success'){
            $.res.redirect(`/new_level/${$.req.params.lesson_id}/code`);
        }else{
            $.res.redirect(`/lesson/${$.req.params.lesson_id}`);
        }
    }
    async update_code() {

    }
    async test() {
        console.log('log from node to ajax post');
    }
    async submit_taskCode(){
        console.log($.req.body);
        console.log($.req.params);
        console.log($.req.session.user_data);
    }
}
module.exports = new Codes(); 