var table_name = "users";
var mysql = require('promise-mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'flightsitedb',
    connectionLimit: 10
  });


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


