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
        let res = await Code.createCode($.req.body, JSON.stringify(content), lesson_id);
        if (res != 'success') {
            $.req.session.msg = { error: res };
            $.res.redirect(`/new_level/${$.req.params.lesson_id}/code`);
        } else {
            $.req.session.msg = { success: ["Code Task added Successfully!"] };
            $.res.redirect(`/lesson/${$.req.params.lesson_id}`);
        }
    }
    async update_code() {
        let level_id = $.req.params.level_id;
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
        let res = await Code.updateCode($.req.body, JSON.stringify(content), level_id);
        if (res != 'success') {
            $.req.session.msg = { error: res };
            // $.res.redirect('back');
            $.res.redirect(`/material/${$.req.params.lesson_id}/level/${$.req.params.level_id}/edit`);
        } else {
            $.req.session.msg = { success: ["Code Task updated Successfully!"] };
            $.res.redirect(`/lesson/${$.req.params.lesson_id}`);
        }
    }
    async test() {
        console.log('log from node to ajax post');
    }
    async submit_taskCode() {
        console.log($.req.body);
        console.log($.req.params);
        console.log($.req.session.user_data);
    }
}
module.exports = new Codes(); 