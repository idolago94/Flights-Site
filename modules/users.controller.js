var table_name = "users";
var mysql = require('promise-mysql');

const database = {
    host: 'ec2-107-20-198-176.compute-1.amazonaws.com:5432',
    user: 'pcttbpkllgxpwh',
    password: '22edc4cbf21dd4fa086b2fa67c949454202654ef61e38698bd27c860fef323cb',
    port: 3306,
    database: 'flightsitedb',
    connectionLimit: 10
  }

// var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'flightsitedb',
//     connectionLimit: 10
//   });
var pool = mysql.createPool(database);


module.exports = {

    getAllUsers: function () {
        let sql=`SELECT * FROM ${table_name}`;
        return pool.query(sql);
    },

    getUserById: (id) => {
        let sql=`SELECT * FROM ${table_name}
        WHERE id=${id}`;
        return pool.query(sql);
    },

    getUserByUsername: (username) => {
        
        let sql=`SELECT * FROM ${table_name}
        WHERE username='${username}'`;

        return pool.query(sql);
    },
    
    addUser: (user) => {
        let sql=`INSERT INTO ${table_name} (username,name,password) VALUES ('${user.username}','${user.name}','${user.password}')`;
        return pool.query(sql);
    },

    addFollow: (id, vacationsArray) => {
        let sql=`UPDATE ${table_name}
                 SET vacations='${vacationsArray}' WHERE id=${id}`;

        return pool.query(sql);
    }
}


