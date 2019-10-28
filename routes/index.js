var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const database = {
  host: 'ec2-107-20-198-176.compute-1.amazonaws.com:5432',
  user: 'pcttbpkllgxpwh',
  password: '22edc4cbf21dd4fa086b2fa67c949454202654ef61e38698bd27c860fef323cb',
  port: 3306
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/db', function(req, res, next) {
  // var connection= mysql.createConnection({
  //   host: 'localhost',
  //   port: 3306,
  //   user: 'root',
  //   password: 'root',
  // });
  var connection = mysql.createConnection(database);

  connection.connect(function(err){
    if(err) throw err;
    console.log('connected');
      connection.query("CREATE SCHEMA IF NOT EXISTS `flightsitedb`", function (err, result, fields) {
        if (err) throw err;
        res.redirect('/userstable');
      });
  }); 
});

router.get('/userstable', function(req, res, next) {
  
//   var con = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'root',
//     database: 'flightsitedb'
// });
var con = mysql.createConnection({
  ...database,
  database: 'flightsitedb'
});
    // if(err) throw err;
    console.log('connected');
    var sql=`
    CREATE TABLE IF NOT EXISTS flightsitedb.users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(45) NOT NULL,
      name VARCHAR(45) NOT NULL,
      password VARCHAR(99) NOT NULL,
      status VARCHAR(45) NOT NULL DEFAULT 'user',
      vacations VARCHAR(9999) NOT NULL DEFAULT '[]',
      UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
      PRIMARY KEY (id),
      UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE);
    `;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.redirect('/vacationstable');
      });
});

router.get('/vacationstable', function(req, res, next) {
  
//   var con = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'root',
//     database: 'flightsitedb'
// });
var con = mysql.createConnection({
  ...database,
  database: 'flightsitedb'
});
    // if(err) throw err;
    console.log('connected');
    var sql=`
    CREATE TABLE IF NOT EXISTS flightsitedb.vacations (
      id INT NOT NULL AUTO_INCREMENT,
      description VARCHAR(999) NULL,
      destination VARCHAR(45) NULL,
      picture VARCHAR(9999) NULL,
      arrival VARCHAR(45) NULL,
      returndate VARCHAR(45) NULL,
      price VARCHAR(45) NULL,
      following VARCHAR(45) NOT NULL DEFAULT '0',
      UNIQUE INDEX id_UNIQUE (id ASC) VISIBLE,
      PRIMARY KEY (id));
    
    `;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // res.send('vacations table created');
        res.redirect('/createadmin');
      });
});

router.get('/createadmin', async function(req,res) {

//   var con = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'root',
//     database: 'flightsitedb'
// });
var con = mysql.createConnection({
  ...database,
  database: 'flightsitedb'
});
    // if(err) throw err;
    console.log('connected');
    var sql= `
    INSERT IGNORE INTO flightsitedb.users 
    (username, name, password, status) 
    VALUES ('admin', 'admin', 'admin', 'admin');`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.redirect('/');
      });
});


module.exports = router;
