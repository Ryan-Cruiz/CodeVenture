# MVC_123

## Quickstart
To get started download or clone this git. 

To download press  `< > Code` and press **Download ZIP**

**OR**

Copy the following below on your git bash:
```
git clone https://github.com/Ryan-Cruiz/MVC-123.git
```
Open your Bash or CMD and change the directory to the MVC folder like this
```
cd MVC-123
```
Install Dependecies
```
npm install
```
Start it by typing this snippet below
```
npm start
```
Congratulation you successfully run the program! 🎉

## Folder Structure
- **Controller**
-- This where all the controllers go
- **Model**
-- All of the Logics and query
- **Views**
-- All of the HTML/EJS going here
- **Assets**
-- All of the img,css will go here
- **System**
-- All core structure that made this framework run

## Features

- **Routing System**
- **Profiler** - Only runs on the server side console.log()
   Content of profiler:
-- DATA(url,method, and fetched data)
-- QUERIES(query statement, and query result)
-- SESSION
- **Validation** - Has eight different rules so far
-- **required** - will check if the field is not empty
-- **min_length** e.g min_length[8]
-- **max_length** e.g max_length[8]
-- **email** - will look up the string if it's valid email
-- **confirm** e.g confirm[password] - will check if it's the same as password
-- **is_numeric** - will check the field if inputted is only a number
-- **is_char** - will check the field if inputted is only a characters

## Making your simple website
Making a simple webpage using the framework

-- Make an `index.ejs` file in views 
```
<!DOCTYPE html>
<html>
    <head>
        <title> Welcome </title>
    </head>
    <body>
        <h1> Welcome to the framework!! </h1>
    </body>
</html>
```
--  Make a controller file and name it `Welcome.js` and require config
-- Create a class (you can name it (optional))
-- Make an `index` function
```
const { config, profile } = require('../loaders.js');
class Welcome {
    index(){
        // make an index.ejs in the view folder
        profile.res.render('index'); 
        // end the response
        profile.res.end(); 
    }
}
module.exports = new Welcome();
```
On the `routes.js`
```
// require the controller and route_path on core.js
const { route_path, controller } = require('./core.js');
// take the route_path to use it on routing
const $ = route_path; 
// require the controller
const Welcome = controller('Welcome');

$.get['/'] = Welcome.index; // get the index function in Welcome.js
// $.post for post method

module.exports = $.execute_path(); // execute all routes
```
Here you have it, you made a simple website using the framework! 🎉🥳

### Connecting it on Database
On `config.js` 
```
// pg / mysql
db_type: database_type,
database:
{
    "host": "localhost",
    "user": "your_database_user_here",
    "password": "your_database_password_here",
    "database": "your_database_schema_here",
    "port": port number
}
```
Make a file in the model folder for this example let's name it `Car.js`
```
// require the loaders and require the model
const { model } = require('../loaders'); 

// create a class and extend the mvc_model
class Car extends model{
 // code goes here
}
module.exports = new Car();
```
Lets say we are going to get all the cars stored in database
```
// inside the class
    async get_all(){
        let query = "SELECT * FROM cars"; // query statement
        // let's now call the query function from mvc_model
        /*  doing some magic, you can look this up
         *  on mvc_model.js it's pretty simple 
         */ 
        let result = await super.query(query); 
        return result; // return it on for controller to take
    }
```
Go to the `Welcome.js` in controller and require the `Sample.js`
```
const { model } = require('../core.js');
const Car = model('Car'); // require the Sample.js
```
Let's modify what's inside the `index` function
```
async index(){
    const res = await Sample.get_all(); // take the data
        // render the result in index.ejs
        profile.res.render('index',res); 
        // end the response
        profile.res.end(); 
    });
}
```
## Enable The Profiler
On Folder models and File `Car.js`.
```
async get_all(callback) {
    this.profiler_enable();
    ...codes
}
```
## Using the ORM
First require the orm from the loaders.
```
const { orm } = require('../loaders.js');
```
The ORM has the following functions:
- select
```
//select all
orm.select(tbl_name,'*').exec();
//selected values
orm.select(tbl_name,[values]).exec();
```
- where
```
// condition example ['v1 = v2']
orm.select(tbl_name,'*').where([conditions]).exec();
```
- or
```
orm.select(tbl_name,'*').where(['v1 = v3',orm.or(v1 = v2)]).exec();
```
- and
```
orm.select(tbl_name,'*').where(['v1 = v3',orm.and(v1 = v2)]).exec();
```
- inner
```
 orm.select('tbl_name','*').inner('tbl_name2', ['id', 'val_id']).exec();
```
- destroy
```
orm.destroy(tbl_name).where([condition]).exec();
```
You can log this to see the ORM output. Also you always need to **exec()** to get the expected output. Lastly this ORM is not directly going to **execute** and query itself, it is a **query builder** so you can **append** new query when you exec() so you can play with it.
```
let query = orm.select('tbl_name','*').exec()
console.log(query); // SELECT * FROM tbl_name
query += ' WHERE id = 1';
console.log(query) // SELECT * FROM tbl_name WHERE id = 1
```
## All modules
-- In case the framework don't have modules, you can look up to this and install the following.
- [Bycryptjs](https://www.npmjs.com/package/bcryptjs)
```sh
npm install bcryptjs 
```
- [Body-parser](https://www.npmjs.com/package/body-parser)
```sh
npm install body-parser
```
- [Ejs](https://www.npmjs.com/package/ejs)
```sh
npm install ejs
```
- [Express](https://www.npmjs.com/package/express)
```sh
npm install express
```
- [Express-session](https://www.npmjs.com/package/express-session)
```sh
npm install express-session
```
- [Mysql](https://www.npmjs.com/package/mysql)
```sh
npm install mysql
```
