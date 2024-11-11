const core = require('./core.js');
const route_path = core.route_path;
const controller = core.controller;
const UserController = controller('Users');
const $ = route_path;
const PlatformsController = controller('Platforms');
const CodesController = controller('Codes');
const LevelsController = controller('Levels');
const FeedbacksController = controller('Feedbacks');
const middleware = require('./middleware.js');

middleware.routeRole = {
    "all": ['/'],
    "auth":
        [
            '/logout',
            '/settings',
            '/lesson/:id',
            '/material/:id/level/:level_id',
            '/submit/task/:lesson_id/:id',
            '/material/:id/level/:level_id/preview',
            '/submit/code/:lesson_id/:id',
            '/update/code/:lesson_id/:id',
            '/material/:lesson_id/feedback',
            '/material/:lesson_id/feedback/submit',
            '/submit/codeTask/:lesson_id/:level_id',
        ],
    "guest": ['/createAccount', '/register', '/login','/home'],
    "admin": [
        '/settings',
        '/create_lesson',
        '/create_task',
        '/create_material',
        '/new_level/:lesson_id/material',
        '/new_level/:lesson_id/task',
        '/new_level/:lesson_id/code',
        '/create_challenge',
        '/material/:id/level/:level_id/edit',
        '/edit_material/:lesson_id/:id',
        '/edit_task/:lesson_id/:id',
        '/edit_lesson',
        '/material/:id/level/:level_id/answers',
        '/test',
        '/submit/code/:lesson_id',
        '/update/code/:lesson_id/:id',
    ]
}
/* $.post is for the forms  if you want to get the data */
/* START OF USERCONTROLLER */
$.get['/'] = UserController.index; // index function
$.post['/login'] = UserController.login;
$.post['/createAccount'] = UserController.createAccount;
$.get['/register'] = UserController.register;
$.get['/logout'] = UserController.logOut;
// $.get['/dashboard'] = UserController.success;
// $.get['/failure'] = UserController.fail; 
$.get['/settings'] = UserController.settings;
/* END OF USERCONTROLLER */

/* START OF PLATFORMCONTROLLER */
$.get['/lesson/:id'] = PlatformsController.index;
$.post['/create_lesson'] = PlatformsController.create_lesson;
$.post['/edit_lesson'] = PlatformsController.edit_lesson;

$.get['/new_level/:lesson_id/code'] = CodesController.new_code;
$.post['/submit/code/:lesson_id'] = CodesController.create_code;
$.post['/update/code/:lesson_id/:level_id'] = CodesController.update_code;
$.post['/test'] = CodesController.test;
$.post['/submit/codeTask/:lesson_id/:level_id'] = CodesController.submit_taskCode;
/* END OF PLATFORMCONTROLLER */

/* START OF LEVELCONTROLLER */
$.get['/material/:id/level/:level_id'] = LevelsController.show_material;

$.get['/material/:id/level/:level_id/edit'] = LevelsController.edit_level;
// $.get['/task/:id/level/:level_id'] = LevelsController.show_task;
$.get['/new_level/:lesson_id/material'] = LevelsController.new_material;
$.get['/new_level/:lesson_id/task'] = LevelsController.new_task;
$.post['/create_material'] = LevelsController.create_material;
$.post['/edit_material/:lesson_id/:id'] = LevelsController.update_level;

$.post['/create_task'] = LevelsController.create_task;
$.post['/edit_task/:lesson_id/:id'] = LevelsController.update_level;
$.post['/submit/task/:lesson_id/:id'] = LevelsController.submit_task;


$.get['/material/:id/level/:level_id/answers'] = LevelsController.task_answers;
$.get['/material/:id/level/:level_id/preview'] = LevelsController.previewTask;
/* END OF LEVELCONTROLLER */
$.get['/material/:lesson_id/feedback'] = FeedbacksController.index;
$.post['/material/:lesson_id/feedback/submit'] = FeedbacksController.add_feedback;

/* START OF FEEDBACKCONTROLLER */

/* END OF FEEDBACKCONTROLLER */
module.exports = $.execute_path();
middleware.routes = $.routes;

