const loader = require('../loaders.js');
const model = loader.core.model;
const Level = model("Level");
const $ = loader.profile;
class Levels {
    async new_material() {
        $.res.locals.lesson_id = $.req.params.lesson_id;
        $.res.render('level/addMaterial');
    }
    async create_material() {
        let res = await Level.createMaterial($.req.body)
        let id = $.req.body.lesson_id;
        if (res != 'success') {
            console.log(res);
        }
        $.res.redirect(`lesson/${id}`);
    }
    async create_task() {
        let questions = $.req.body.question;
        let answers = $.req.body.correctAnswer;
        let questionChoices = $.req.body.questionChoice;
        let questionLen = $.req.body.choice_length;
        console.log($.req.body, $.req.params);
        let content = arrayToJson(questionLen, questions, answers, questionChoices)
        // console.log(typeof content)
        let res = await Level.createTask($.req.body, JSON.stringify(content));
        if (res == 'success') {
            let id = $.req.body.lesson_id;
            $.res.redirect(`lesson/${id}`);
        } else {
            $.res.redirect('back');
        }
    }

    async new_task() {
        $.res.locals.lesson_id = $.req.params.lesson_id;
        $.res.render('level/addTask');
    }
    async edit_level() {
        $.res.locals.lesson_id = $.req.params.lesson_id;
        let res = await Level.getLevel($.req.params);
        console.log(res)
        $.res.render('level/editMaterial', { data: res });
    }
    async update_level() {
        console.log($.req.body);
        console.log($.req.params)
        if ($.req.body.isTask == '0') {
            let res = await Level.updateMaterial($.req.body, $.req.params)
            if (res != 'success') {
                $.res.redirect('back')
            } else {
                $.res.redirect(`/material/${$.req.params.lesson_id}/level/${$.req.params.id}`);
            }
        } else {
            let questions = $.req.body.question;
            let answers = $.req.body.correctAnswer;
            let questionChoices = $.req.body.questionChoice;
            let questionLen = $.req.body.choice_length;
            let content = arrayToJson(questionLen, questions, answers, questionChoices)
            console.log($.req.body, $.req.params, content);
            let res = await Level.updateTask($.req.body, $.req.params, JSON.stringify(content));
            if (res != 'success') {
                $.res.redirect('back')
            } else {
                $.res.redirect(`/material/${$.req.params.lesson_id}/level/${$.req.params.id}`);
            }
        }

    }
    async show_material() {
        let res = await Level.getLevel($.req.params);
        // console.log(res, typeof JSON.parse(res[0].content));
        let listRes = await Level.getMaterials($.req.params.id);
        $.res.render('level/showLevel', { data: res, lists: listRes });
    }
    async submit_task() {
        let inputs = { id: $.req.params.lesson_id, level_id: $.req.params.id,user_id: $.req.session.user_data.user_id };
        let res = await Level.getLevel(inputs);
        let answers = $.req.body.answers;
        let questions = JSON.parse(res[0].content.toString());
        let correct = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].answer === answers[i]) {
                correct++;
            }
        }
        let saveTaskAnswers = await Level.saveTaskAnswers(inputs,JSON.stringify($.req.body));
        // console.log(answers.toString())
        console.log(saveTaskAnswers);
        console.log('Correct Answer:', correct);
        // $.res.send($.req.body)
    }
}
function arrayToJson(questionLen, questions, answers, questionChoices) {
    let content = []
    for (let i = 0; i < questionLen.length; i++) {
        let json = { question: "", choices: [], answer: "" }
        json.question = questions[i];
        json.answer = answers[i];
        for (let j = 0; j < questionLen[i]; j++) {
            json.choices.push(questionChoices[0]);
            questionChoices.shift();
        }
        content.push(json);
    }
    return content;
}
module.exports = new Levels(); 
