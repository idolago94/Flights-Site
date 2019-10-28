var table_name = "vacations";
var mysql = require('promise-mysql');

const database = {
    host: 'ec2-107-20-198-176.compute-1.amazonaws.com',
    user: 'pcttbpkllgxpwh',
    password: '22edc4cbf21dd4fa086b2fa67c949454202654ef61e38698bd27c860fef323cb',
    port: 5432,
    database: 'dbs992rsl222bo',
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

    getAllVacations: function () {
        let sql=`SELECT * FROM ${table_name}`;
        return pool.query(sql);
    },

    getVacationById: (id) => {
        let sql=`SELECT * FROM ${table_name}
        WHERE id=${id}`;
        return pool.query(sql);
    },
    
    addVacation: (vacation) => {
        let sql=`INSERT INTO ${table_name} (description, destination, picture, arrival, returndate, price)
                 VALUES ('${vacation.description}', '${vacation.destination}', '${vacation.picture}', '${vacation.arrival}', '${vacation.returndate}', ${vacation.price})`;

        return pool.query(sql);
    },

    updateVacation: (vacation,id) => {
        let sql=`UPDATE ${table_name}
                 SET description='${vacation.description}', destination='${vacation.destination}', picture='${vacation.picture}', arrival='${vacation.arrival}', returndate='${vacation.returndate}', price=${vacation.price} WHERE id=${id}`;

        return pool.query(sql);
    },
    
    deleteVacation: (id) => {
        let sql = `DELETE FROM ${table_name} WHERE id=${id}`;
        return pool.query(sql);
    },

    changeFollow: (value,id) => {
        let sql=`UPDATE ${table_name}
                 SET following='${value}' WHERE id=${id}`;

        return pool.query(sql);
    }
}


