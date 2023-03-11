const express = require('express');
const cors = require('cors');
const app = express();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
var bodyParser = require('body-parser')



const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 
app.use(bodyParser.json())

app.use('/login', async (req, res) => {

    const { username, password } = req.body;

    console.log(req.body);

    
    compareUser(username, function(err, isUserMatch) {
      if (err)
          throw new Error('Something went wrong on the server!');
      if (!isUserMatch) {
          res.status(401).json({ message: 'Username or password is incorrect' });
          return;
      }

    comparePassword("password", password, function(err, isPasswordMatch) {
        if (err)
            throw new Error('Something went wrong on the server!');
        if (isPasswordMatch) {
            res.json({
                token: jwt.sign({ foo: username }, 'supersecretkey11')
            });
        } else {
            res.status(401).json({ message: 'Username or password is incorrect' });
        }
      });
    });


function comparePassword(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
        if (err)
            return callback(err);
        callback(null, isPasswordMatch);
    });
}

function compareUser(username, callback) {
    if (username === "username") {
        callback(null, true);
    } else {
        callback(null, false);
    }
} 

});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));