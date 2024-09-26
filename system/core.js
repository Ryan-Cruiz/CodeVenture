const Express = require("express");
const Router = Express.Router();
const bodyParser = require('body-parser');
const middleware = require("./middleware");
// const jsonParser = bodyParser.json();
/**
 * 
 */
class route_path {
    constructor() {
        this.routes = [];
        this.get = {};
        this.post = {};
        this.put = {};
        this.destroy = {};
    }
    execute_path() {
        let get = Object.keys(this.get);
        let post = Object.keys(this.post);
        let put = Object.keys(this.put);
        let destroy = Object.keys(this.destroy);
        // console.log('get', this.get);
        for (let i = 0; i < get.length; i++) {
            Router.get(get[i], (req, res, next) => {
                this.middlewareRoleChecker(req, res, next, get[i]);
            }, this.get[get[i]]);
            this.routes.push(get[i]);
        }
        for (let i = 0; i < post.length; i++) {
            //console.log('post',post[i],this.post[post[i]]);
            Router.post(post[i], (req, res, next) => {
                this.middlewareRoleChecker(req, res, next, post[i]);
            }, this.post[post[i]]);
            this.routes.push(post[i]);
        }
        for (let i = 0; i < put.length; i++) {
            //console.log('put',put[i],this.put[put[i]]);
            Router.put(put[i], (req, res, next) => {
                this.middlewareRoleChecker(req, res, next, put[i]);
            }, this.put[put[i]]);
            this.routes.push(put[i]);
        }
        for (let i = 0; i < destroy.length; i++) {
            // console.log('destroy', destroy[i], this.destroy[destroy[i]]);
            Router.delete(destroy[i], (req, res, next) => {
                this.middlewareRoleChecker(req, res, next, destroy[i]);
            }, this.destroy[destroy[i]]);
            this.routes.push(destroy[i]);
        }
        return Router;
    }
    middlewareRoleChecker(req, res, next, currentURL) {
        let appServiceRole = middleware.validate_role(req.session.roles, currentURL);
        if (!appServiceRole) {
            // console.log(appServiceRole, 'app', currentURL);
            res.redirect('back');
            res.end();
        } else {
            next();
        }
        // console.log(appServiceRole, 'from middle')
        // console.log(roles, 'from middle', req.session);
    }
}
/**
 * 
 */
function routing(filepath) {
    const new_Controller = require(filepath);
    return new_Controller;
}
function routes(filepath) {
    let newRoute = routing(filepath);
    return newRoute;
}
/**
 * This Function will take a JS FILE and require the file to be use in taking queried data
 * or elsewhere
 */
function model(filepath) {
    let newRoute = routing('../src/models/' + filepath + '.model');
    return newRoute;
}
/**
 *  This Function will take a JS FILE and require the file to be use in routing or elsewhere
 */
function controller(filepath) {
    let newRoute = routing('../src/controllers/' + filepath + '.controller');
    return newRoute;

}

module.exports = {
    route_path: new route_path(),
    model: model,
    controller: controller,
}