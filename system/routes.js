const core = require('./core.js');
const route_path = core.route_path;
const controller = core.controller;
const UserController = controller('Users');
const $ = route_path;
const middleware = require('./middleware.js');

middleware.routeRole = {
    "guest": ['/createAccount','/register'],
    "authenticated": ['/dashboard','/logout']
}
/* $.post is for the forms  if you want to get the data */
$.get['/'] = UserController.index; // index function
$.post['/login'] = UserController.login;
$.post['/createAccount'] = UserController.createAccount;
$.get['/register'] = UserController.register;
$.get['/logout'] = UserController.logOut;
$.get['/dashboard'] = UserController.success;
$.get['/failure'] = UserController.fail; 
module.exports = $.execute_path();
middleware.routes = $.routes;

