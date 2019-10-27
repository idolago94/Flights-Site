var mysql = require('mysql');
var table_name='pictures_prices';

module.exports = {
    connectToDB: function () {
        var con = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'pictures'
        });
        return con;
    },
    addPic: function(con,pic,res){
        con.connect(function(err){
            if(err)throw err;
            console.log('connect!');
            let query=`INSERT INTO ${table_name} (name,price)
                        VALUES ('${pic.name}',${pic.price})`;
            console.log(query);
            con.query(query,function(err,result){
                if(err)throw err;
                res.json(result);
            })
        })
    },
    updatePic: function(con,id,pic,res){
        con.connect(function(err){
            if(err)throw err;
            let query=`UPDATE ${table_name}
                        SET name=${pic.name} , price=${pic.price}
                        WHERE id=${id}`;
            console.log(query);
            con.query(query,function(err,result){
                if(err)throw err;
                res.json(result);
            })
        })
    }
}