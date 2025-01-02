/* will get the routes from the routes.js(this module will here temporarily)*/
require('dotenv');
module.exports = {

    port: process.env.PORT || 3000,
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
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT

    },
    session:
    {
        secret: 'c0d3V3nTuR3',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 600000 }
    },
}
