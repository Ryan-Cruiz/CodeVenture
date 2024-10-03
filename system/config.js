/* will get the routes from the routes.js(this module will here temporarily)*/

module.exports = {

    port: 3000,
    db_type: 'mysql',
    // database:
    // {
    //     host: 'db',
    //     user: 'root',
    //     password: 'root',
    //     database: 'codeventure',
    //     port: 3306
    // },
    database: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'codeventure',
        port: 3307
    },
    session:
    {
        secret: 'c0d3V3nTuR3',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
    },
}
