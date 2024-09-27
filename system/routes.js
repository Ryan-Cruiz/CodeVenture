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
            '/lesson/:id/level/:level_id',
        ],
    "guest": ['/createAccount', '/register', '/login'],
    "admin": ['/settings', '/create_lesson','/create_level','/new_level/material','/new_level/task']
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

console.log();

/* START OF PLATFORMCONTROLLER */
$.get['/lesson/:id'] = PlatformsController.index;
$.post['/create_lesson'] = PlatformsController.create_lesson;

$.get['/lesson/:id/level/:level_id'] = PlatformsController.test;
/* END OF PLATFORMCONTROLLER */

/* START OF LEVELCONTROLLER */
$.get['/new_level/material'] = LevelsController.new_level;
$.post['/create_level'] = LevelsController.create_level;
/* END OF PLATFORMCONTROLLER */
module.exports = $.execute_path();
middleware.routes = $.routes;

