const core = require('./core.js');
const route_path = core.route_path;
const controller = core.controller;
const UserController = controller('Users');
const $ = route_path;
const PlatformsController = controller('Platforms');
const LevelsController = controller('Levels');
const middleware = require('./middleware.js');

middleware.routeRole = {
    "all": ['/'],
    "auth":
        [
            '/logout',
            '/settings',
            '/lesson/:id',
            '/material/:id/level/:level_id',
        ],
    "guest": ['/createAccount', '/register', '/login'],
    "admin": [
        '/settings',
        '/create_lesson',
        '/create_task',
        '/create_material',
        '/new_level/:lesson_id/material',
        '/new_level/:lesson_id/task',
        '/create_challenge',
        '/material/:id/level/:level_id/edit',
        '/edit_material/:lesson_id/:id'
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

/* END OF PLATFORMCONTROLLER */
module.exports = $.execute_path();
middleware.routes = $.routes;

