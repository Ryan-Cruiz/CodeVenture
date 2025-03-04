const loader = require('../loaders.js');
const model = loader.core.model;
const Level = model("Level");
const $ = loader.profile;
class Levels {
    async new_material() {
        $.res.locals.lesson_id = $.req.params.lesson_id;
        $.res.locals.afterLessonNumber = $.req.query.after;
        $.res.render('level/addMaterial');
    }
    async create_material() {
        let res = await Level.createMaterial($.req.body)
        let id = $.req.body.lesson_id;
        console.log(res);
        if (res != 'success') {
            $.req.session.msg = { error: res };
            $.res.redirect('back');
        } else {
            $.req.session.msg = { success: ["Material Created Successfully!"] };
            $.res.redirect(`lesson/${id}`);
        }
    }
    async create_task() {
        let questions = $.req.body.question;
        let answers = $.req.body.correctAnswer;
        let questionChoices = $.req.body.questionChoice;
        let questionLen = $.req.body.choice_length;
        let description = $.req.body.description;
        console.log($.req.body, $.req.params);
        if (questionLen == undefined) {
            $.req.session.msg = { error: ['Put At least 1 question.'] };
            $.res.redirect('back')
        } else {
            let content = arrayToJson(questionLen, questions, answers, questionChoices, description)
            // console.log(typeof content)
            let res = await Level.createTask($.req.body, JSON.stringify(content));
            if (res == 'success') {
                let id = $.req.body.lesson_id;
                $.req.session.msg = { success: ["Task added Successfully!"] };
                $.res.redirect(`lesson/${id}`);
            } else {
                $.req.session.msg = { error: res };
                $.res.redirect('back');
            }
        }
    }

    async new_task() {
        $.res.locals.afterLessonNumber = $.req.query.after;
        $.res.locals.lesson_id = $.req.params.lesson_id;
        $.res.render('level/addTask');
    }
    async edit_level() {
        $.res.locals.lesson_id = $.req.params.lesson_id;
        let res = await Level.getLevel($.req.params);
        console.log(res)
        if (res.length <= 0) {
            $.res.status(404).render('404');
        } else {
            $.res.render('level/editMaterial', { data: res });
        }
    }
    async update_level() {
        // console.log($.req.body);
        // console.log($.req.params)
        if ($.req.body.isTask == '0') {
            let res = await Level.updateMaterial($.req.body, $.req.params)
            if (res != 'success') {
                $.req.session.msg = { error: res };
                $.res.redirect('back')
            } else {
                $.req.session.msg = { success: ["Material updated Successfully!"] };
                $.res.redirect(`/material/${$.req.params.lesson_id}/level/${$.req.params.id}`);
            }
        } else if ($.req.body.isTask == '1') {
            let questions = $.req.body.question;
            let answers = $.req.body.correctAnswer;
            let questionChoices = $.req.body.questionChoice;
            let questionLen = $.req.body.choice_length;
            let description = $.req.body.description;
            if (questionLen == undefined) {
                $.req.session.msg = { error: ['Put At least 1 question.'] };
                $.res.redirect('back')
            } else {
                let content = arrayToJson(questionLen, questions, answers, questionChoices, description)
                console.log($.req.body, $.req.params, content);
                let res = await Level.updateTask($.req.body, $.req.params, JSON.stringify(content));
                if (res != 'success') {
                    $.req.session.msg = { error: res };
                    $.res.redirect('back')
                } else {
                    $.req.session.msg = { success: ["Task updated Successfully!"] };
                    $.res.redirect(`/material/${$.req.params.lesson_id}/level/${$.req.params.id}`);
                }
            }
        }

    }
    async show_material() {
        let res = await Level.getLevel($.req.params);
        // console.log(res, typeof JSON.parse(res[0].content));
        console.log(res, 'show material')
        if ((res == undefined || res.length <= 0 || res[0].isEnabled == '0') && $.req.session.roles.indexOf('admin') == -1) {
            $.res.status(404).render('404');
        } else {
            // $.res.locals.params = $.req.params;
            let listRes = await Level.getMaterials($.req.params.id);
            let answers = "";
            console.log(res);
            if (res[0].isTask == 1) {
                answers = await Level.getUserAnswer($.req.params, $.req.session.user_data.user_id);
            }
            // console.log($.req.query);
            if (answers.length == 0 || $.req.query.event == "retake") {
                $.res.render('level/showLevel', { data: res, lists: listRes, isRetake: $.req.query.event });
            } else {
                $.res.redirect(`/material/${$.req.params.id}/level/${$.req.params.level_id}/preview`);
            }
        }
    }
    async previewTask() {
        let res = await Level.getLevel($.req.params);
        // console.log(res, typeof JSON.parse(res[0].content));
        console.log($.req.params, res);
        if ((res.length <= 0 || res[0].isEnabled == '0') && $.req.session.roles.indexOf('admin') == -1) {
            $.res.status(404).render('404');
        } else {
            // $.res.locals.params = $.req.params;
            let listRes = await Level.getMaterials($.req.params.id);
            let answers = await Level.getUserAnswer($.req.params, $.req.session.user_data.user_id);
            // console.log(JSON.parse(answers[0].answers));
            if (answers.length <= 0) {
                $.res.status(404).render('404');
            } else {
                $.res.render('level/previewTask', { data: res, lists: listRes, answers: JSON.parse(answers[0].answers).answers });
            }
        }
    }
    async submit_task() {
        let inputs = { id: $.req.params.lesson_id, level_id: $.req.params.id, user_id: $.req.session.user_data.user_id };
        let res = await Level.getLevel(inputs);
        let arrNum = $.req.body.numberArr.split(',');
        let answers = $.req.body.answers;
        let questions = JSON.parse(res[0].content.toString());
        let correct = 0;
        // console.log(arrNum,answers,questions)
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].answer == answers[i]) {
                correct++;
            }
        }
        console.log(correct, 'score');
        let content = { answers: $.req.body.answers, score: correct, isRetake: $.req.body.isRetake, totalQuestion: questions.length };
        let saveTaskAnswers = await Level.saveTaskAnswers(inputs, content, $.req.body.school_year);
        // console.log(answers.toString())
        console.log(saveTaskAnswers);
        $.req.session.score = correct;
        // $.res.send($.req.body)
        $.res.redirect(`/material/${inputs.id}/level/${inputs.level_id}/score`);
    }
    async task_answers() {
        console.log($.req.params)
        let res = await Level.getLessonSchoolYear($.req.params.id);
        let getTask = await Level.getTaskAnswer($.req.params, res[0].school_year);
        let resSchooYear = await Level.getSchoolYears($.req.params);
        console.log(resSchooYear, 'sadasd')
        // console.log(getTask)
        $.res.locals.params = $.req.params;
        $.res.render('level/showAnswers', { users_answers: getTask, school_year_data: resSchooYear, current_school_year: res[0].school_year });
    }
    async getUsersTasksBySchoolYearApi(){
        console.log($.req.query,'query');
        console.log($.req.params)
        let res = await Level.getTaskAnswer($.req.params, $.req.query.school_year);
        return $.res.json(res);
    }
    async getUserTasksApi() {
        let res = await Level.getUserAnswers($.req.params);
        // console.log(res);
        if (res.length <= 0) {
            $.res.send('not exist')
        } else {
            const data = res.map(item => {
                return {
                    answers: JSON.parse(item.answers),
                    school_year: item.school_year,
                    created_at: item.created_at
                }
            })
            $.res.json(data);
        }
    }
    async taskScore() {
        console.log($.req.params);
        let res = await Level.getUserAnswer($.req.params, $.req.session.user_data.user_id);
        $.res.locals.params = $.req.params;
        console.log(res);
        if ((res.length <= 0 || res[0].isEnabled == '0') && $.req.session.roles.indexOf('admin') == -1) {
            $.res.status(404).render('404');
        } else {
            $.res.render('level/showScore', { data: res });
        }
    }
}
function arrayToJson(questionLen, questions, answers, questionChoices, description) {
    let content = []
    for (let i = 0; i < questionLen.length; i++) {
        let json = { question: "", choices: [], answer: "", description: [] }
        json.question = questions[i];
        json.answer = answers[i];
        json.description = description[i];
        for (let j = 0; j < questionLen[i]; j++) {
            json.choices.push(questionChoices[0]);
            questionChoices.shift();
        }
        content.push(json);
    }
    return content;
}
module.exports = new Levels(); 
