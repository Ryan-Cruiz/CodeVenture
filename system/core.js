const Express = require("express");
const Router = Express.Router();
const bodyParser = require('body-parser');
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
        for (let i = 0; i < get.length; i++) {
            // console.log('get',this.get[get[i]]);
            Router.get(get[i], (req, res, next) => {
                this.middlewareRoleChecker(req, res, next);
            }, this.get[get[i]]);
            this.routes.push(get[i]);
        }
        for (let i = 0; i < post.length; i++) {
            //console.log('post',post[i],this.post[post[i]]);
            Router.post(post[i], (req, res, next) => {
                this.middlewareRoleChecker(req, res, next);
            }, this.post[post[i]]);
            this.routes.push(post[i]);
        }
        for (let i = 0; i < put.length; i++) {
            //console.log('put',put[i],this.put[put[i]]);
            Router.put(put[i], (req, res, next) => {
                this.middlewareRoleChecker(req, res, next);
            }, this.put[put[i]]);
            this.routes.push(put[i]);
        }
        for (let i = 0; i < destroy.length; i++) {
            console.log('destroy', destroy[i], this.destroy[destroy[i]]);
            Router.delete(destroy[i], (req, res, next) => {
                this.middlewareRoleChecker(req, res, next);
            }, this.destroy[destroy[i]]);
            this.routes.push(destroy[i]);
        }
        return Router;
    }
    middlewareRoleChecker(req, res, next) {
        if (!req.appServiceRole) {
            console.log(req.appServiceRole, 'app', req.url);
            res.redirect('back');
            res.end();
        } else {
            next();
        }
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