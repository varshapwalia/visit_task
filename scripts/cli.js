var csv = require('csv');
​
var obj = csv();
​
function MyCSV(user_id, user_name, dates, steps, calories ) {
    this.user_id = user_id;
    this.user_name = user_name;
    this.dates = dates;
    this.steps = steps;
    this.calories = calories;

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
​
var MyData = [];
​
for (var index = 0; index < 4; index++){
  obj.from.path('../data/User-Steps-(i).csv').to.array(function (data) {
      for (var index = 0; index < data.length; index++) {
          MyCSV(data[index][0], data[index][1], data[index][2],data[index][3],data[index][4]);
      }
      console.log(MyData);
  });
}
​
var http = require('http');
​
var server = http.createServer(function (req, resp) {
    resp.writeHead(200, { 'content-type': 'application/json' });
    resp.end(JSON.stringify(MyData));
});
​
server.listen(8080);
