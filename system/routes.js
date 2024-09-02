const core = require('./core.js');
const route_path = core.route_path;
const controller = core.controller;
const UserController = controller('Users');
const $ = route_path;
const PlatformsController = controller('Platforms');
const middleware = require('./middleware.js');

middleware.routeRole = {
    "all": ['/'],
    "auth": ['/logout', '/settings','/chapters/:id'],
    "guest": ['/createAccount', '/register', '/login'],
    "admin": ['/settings', '/logout','/chapters/:id/levels/:level_id']
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
$.get['/chapters/:id'] = PlatformsController.test;
$.get['/chapters/:id/levels/:level_id'] = PlatformsController.index;
/* END OF PLATFORMCONTROLLER */

module.exports = $.execute_path();
middleware.routes = $.routes;

