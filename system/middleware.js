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
    validate_role(currRole, currURL) {
        let routeRole = [];
        let accessRoutes = this.routes;
        // console.log(this.routes, 'calling from validate_role', this.routeRole)
        accessRoutes = accessRoutes.filter((val, index) => accessRoutes.indexOf(val) === index)
        // console.log(accessRoutes, currRole, routeRole,currURL, 'asdsadsadsad');
        for (let i = 0; i < currRole.length; i++) {
            // console.log(this.routeRole[currRole[i]])
            if (this.routeRole[currRole[i]] == currRole[i]) {
                continue;
            }
            routeRole.push(this.routeRole[currRole[i]]);
        }

        // console.log(routeRole, 'acssess')
        // console.log(routeRole, this.routeRole, 'routerole')
        let accessRoutes1 = this.removeRestrictedRoutes(accessRoutes, routeRole);
        // console.log(currURL.indexOf(':') == -1, 'asdacurrent');
        return accessRoutes1.indexOf(currURL) !== -1 ? true : false;
        // return this.routeRole;

    }
    removeRestrictedRoutes(accessRoutes, routeRole) {
        let tempArr = [];
        let keys = Object.keys(routeRole);
        // console.log(routeRole, 'from rrr', accessRoutes, keys)
        for (let i = 0; i < keys.length; i++) {
            tempArr.push(...routeRole[keys[i]])
        }
        // console.log(tempArr, 'temp')
        for (let j = 0; j < tempArr.length; j++) {
            for (let i = 0; i < accessRoutes.length; i++) {
                if (tempArr[j] === accessRoutes[i]) {
                    // console.log(accessRoutes[i], 'match', tempArr[j])
                    accessRoutes.splice(accessRoutes.indexOf(tempArr[j]), 1);
                }
            }
        }
        // console.log(tempArr, 'aftter routs');
        return tempArr;
    }
}
module.exports = new Middleware();