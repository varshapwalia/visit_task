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

    const contacPromise = new Promise((resolve,reject) =>{
    const queryString = "INSERT INTO USERDATA (user_id, user_name, dates, steps, calories) VALUES (?, ?, ?, ?, ?)"
        getConnection().query(queryString, [user_id, user_name, dates, steps, calories], (err, results, fields) => {
          if (err) {
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
          }
        };
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
