/* will get the routes from the routes.js(this module will here temporarily)*/

module.exports = {

    port: 8080,
    db_type: 'mysql',
    database:
    {
        "host": "localhost",
        "user": "root",
        "password": "root",
        "database": "codeventure",
        "port": 3307
    },
    session:
    {
        secret: 'keyboardkitteh',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    },
}
