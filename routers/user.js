// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'visit'
})

function getConnection() {
    return pool
}

router.get("/users", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM DATA"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
      resp.writeHead(200, { 'content-type': 'application/json' });
      res.json(rows)
    })
  })

// FETCH CSV DATA
router.post('/user_csv', (req, res) => {
    console.log("Trying to create a new user...")
    const data = req.body.file

    for (var index = 0; index < data.length; index++) {
        const user_id = data[index][0]
        const user_name = data[index][1]
        const dates = data[index][2]
        const steps = data[index][3]
        const calories = data[index][4]

        //START QUERYING
        const contacPromise = new Promise((resolve,reject) =>{
          //CHECK IF USER LREADY EXIST
          check_exists = getConnection().query("SELECT EXISTS(SELECT user_id FROM USER WHERE user_id=uid)")
          if check_exists{
            //IF USER EXIST JUST SIMPLY PUT REST THE DATA IN THE TABLE
            const queryString = "INSERT INTO DATA (user_id, dates, steps, calories) VALUES (?, ?, ?, ?)"
            getConnection().query(queryString, [uid, dates, steps, calories], (err, results, fields) => {
              if (err) {
                console.log("Failed to insert new USER: " + err)
                res.sendStatus(500)
                return
              }
            };
            }
          else {
            //IF USER DO NOT EXIST MAKE 1 ENTRY FOR USER AS WELL
            const queryString = "INSERT INTO USER (user_id, user_name) VALUES (?, ?)"
            getConnection().query(queryString, [uid, user_name], (err, results, fields) => {
              if (err) {
                console.log("Failed to insert new USER: " + err)
                res.sendStatus(500)
                return
              }
            };

            const queryString = "INSERT INTO DATA (user_id, dates, steps, calories) VALUES (?, ?, ?, ?)"
            getConnection().query(queryString, [uid, dates, steps, calories], (err, results, fields) => {
              if (err) {
                console.log("Failed to insert new DATA: " + err)
                res.sendStatus(500)
                return
              }
            };
          }
          })
        }
    res.end()
  })

//INTIALIZE MYSQL TABLES
router.get("/create_table", (req, res) => {
  const connection = getConnection()
  // if (err) throw err;
  console.log("Connected!");
    var sql = "CREATE TABLE USER (user_id INT NOT NULL, user_name VARCHAR(255)) NOT NULL, PRIMARY KEY (user_id)";
    connection.query(sql, function (err, result) {
      // if (err) throw err;
      console.log("Table created");
      if (err) {
        console.log("Failed to query for USER: " + err)
        res.sendStatus(500)
        return
      }
    });
     var sql = "CREATE TABLE DATA (data_id INT auto_increment, user_id INT, dates Date, steps INT, calories INT, PRIMARY KEY (data_id) ,FOREIGN KEY (user_id) REFERENCES USER (user_id))";
     connection.query(sql, function (err, result) {
        // if (err) throw err;
        console.log("Table created");
        if (err) {
          console.log("Failed to query for DATA: " + err)
          res.sendStatus(500)
          return
        }
      });
  res.end()
});

module.exports = router
