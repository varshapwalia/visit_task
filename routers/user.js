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
    const queryString = "SELECT * FROM USERDATA"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })


// router.post('/user_create', (req, res) => {
//     console.log("Trying to create a new user...")
//
//     console.log("First name: " + req.body.full_name)
//     const user_id = req.body.user_id
//     const user_name = req.body.user_name
//     const dates = req.body.dates
//     const steps = req.body.steps
//     const calories = req.body.calories
//
//     const queryString = "INSERT INTO USERDATA (user_id, user_name, dates, steps, calories) VALUES (?, ?, ?, ?, ?)"
//     getConnection().query(queryString, [user_id, user_name, dates, steps, calories], (err, results, fields) => {
//       if (err) {
//         console.log("Failed to insert new user: " + err)
//         res.sendStatus(500)
//         return
//       }
//
//       console.log("Inserted a new user with id: ", results.insertId);
//       res.end()
//     })
//   })

// router.get("/create_table", (req, res) => {
//   const connection = getConnection()
//   // if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE USERDATA (user_id INT, user_name VARCHAR(255), dates Date, steps INT, calories INT)";
//   connection.query(sql, function (err, result) {
//     // if (err) throw err;
//     console.log("Table created");
//     if (err) {
//       console.log("Failed to query for users: " + err)
//       res.sendStatus(500)
//       return
//     }
//   });
//   res.end()
// });

module.exports = router
