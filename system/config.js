/* will get the routes from the routes.js(this module will here temporarily)*/

module.exports = {

    port: 3000,
    db_type: 'mysql',
    database:
    {
        "host": 'db',
        "user": "root",
        "password": "root",
        "database": "codeventure"
    },
    session:
    {
        secret: 'keyboardkitteh',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    },
}
