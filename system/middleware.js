class Middleware {
    constructor() {
        this.routeRole = {};
        this.routes = [];
    }
    /**
     * 
     * @param {*} currURL 
     * will take the current url and find in function if have access to the route
     * @param {*} currRole 
     * will take array of roles that will match if have acces to the route
     * @returns 
     * returns true if have access to the route
     */
    validate_role(currURL, currRole) {
        let routeRole = this.routeRole;
        let accessRoutes = this.routes;
        // console.log(this.routes, 'calling from validate_role')
        accessRoutes = accessRoutes.filter((val, index) => accessRoutes.indexOf(val) === index)
        // console.log(accessRoutes, currRole, routeRole);
        this.removeRestrictedRoutes(accessRoutes, routeRole, currRole);
        return accessRoutes.indexOf(currURL) !== -1 ? true : false;
    }
    removeRestrictedRoutes(accessRoutes, routeRole, currRole) {
        let tempArr = [];
        for (let i = 0; i < currRole.length; i++) {
            delete routeRole[currRole[i]];
        }
        let keys = Object.keys(routeRole);
        // console.log(routeRole, 'from rrr', accessRoutes)
        for (let i = 0; i < keys.length; i++) {
            tempArr.push(...routeRole[keys[i]])
        }
        // console.log(tempArr, 'temp')
        for (let j = 0; j < tempArr.length; j++) {
            for (let i = 0; i < accessRoutes.length; i++) {
                if (tempArr[j] === accessRoutes[i]) {
                    // console.log(accessRoutes[i], 'match', tempArr[j])
                    accessRoutes.splice(accessRoutes.indexOf(tempArr[j]),1);
                }
            }
        }
        // console.log(accessRoutes, 'aftter routs');
    }
}
module.exports = new Middleware();