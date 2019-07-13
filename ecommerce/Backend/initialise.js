const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const saltRounds = 10;


const usersSchema = require('./model/userModel')
mongoose.connect('mongodb://localhost/E-commerce');

var hash = bcrypt.hashSync("admin", saltRounds);
var userJson = {
    name: "dheeraj",
    username: "admin",
    password: hash,
    userType: "Manager"
};
var users = new usersSchema(userJson);

users.save(function(err, result) {
    console.log("Admin Account Created");
});