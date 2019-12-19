const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//CALL BACKS
function getUsers(cb){
  // fs.readFile takes a filename, character set, and callback. The cb takes an error and the conent of data.json
  fs.readFile('data.json', 'utf8', (err, data) => {
    // if there's an error, return the cb, passing in the error
    if (err) return cb(err);
    // otherwise, parse the content of data
    const users = JSON.parse(data);
    // and then return the cb with null (because there isn't an error) and the parsed data
    return cb(null, users);
  });
}

app.get('/', (req,res) => {
  // getUsers
  getUsers((err, users) => {
    if(err){
      res.render("error", {error: err});
    } else {
      res.render(title: "Users", "users": users.users);
    }

  });
}); 


app.listen(3000, () => console.log('App listening on port 3000!'));