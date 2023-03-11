const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt')
var bodyParser = require('body-parser')

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.json())

app.use('/login', (req, res) => {

    const { username, password } = req.body;

    comparePassword("password", password, function(err, isMatch) {
        if (err) throw err;
        console.log('123', isMatch); 
    });





    res.send({
      token: 'test123'
    });
});


function comparePassword(plainPass, hashword, callback) {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
        if (err)
            return callback(err);
        callback(null, isPasswordMatch);
    });
}

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));