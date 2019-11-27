const express = require('express');
const assert = require('assert');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoDBuri = 'mongodb+srv://tester1:test1@kc2019-db7fy.azure.mongodb.net/test?retryWrites=true&w=majority';
const dbName = 'user';
const app = express();

app.get('/login', (req, res) => 
    res.render('Login')
)

app.get('/register', (req, res) => 
    res.render('register')
)

app.post('/users/register', (req, res) => {
    let uname = req.body.username;
    let pw = req.body.password;
    let pw2 = req.body.password2;

    if(pw != pw2){
        console.error({msg: 'Password do not match'});        
    }

    mongo.connect(mongoDBuri, function(err, db) {
        assert.equal(null, err);
        db.collection('account').insertOne({uname, pw}, function(err, res) {
          assert.equal(null, err);
          console.log('Item inserted');
          db.close();
        });
      });
    res.redirect('/');
})

module.exports = app;