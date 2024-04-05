const core = require('./core.js');
const route_path = core.route_path;
const controller = core.controller;
const UserController = controller('Users');
const $ = route_path;
const middleware = require('./middleware.js');

middleware.routeRole = {
    "guest": ['/'],
}
/* $.post is for the forms  if you want to get the data */
$.get['/'] = UserController.index; // index function
$.get['/success'] = UserController.success;
$.get['/failure'] = UserController.fail; 
module.exports = $.execute_path();
middleware.routes = $.routes;

