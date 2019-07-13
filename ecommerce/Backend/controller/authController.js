const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const bcrypt = require('bcrypt');

const saltRounds = 10;


const usersSchema = require('../model/userModel')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/E-commerce');


router.post('/signup', (req, res, next) => {

    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var userJson = {
        name: req.body.name,
        username: req.body.username,
        password: hash,
        userType: req.body.userType
    };
    var users = new usersSchema(userJson);
    users.save(function(err, result) {
        console.log(result);

        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({
                status: "success",
                data: result
            })
        }
    })

});

router.post('/signin', (req, res, next) => {
    console.log("Entered Login :: ", req.body);

    usersSchema.findOne({ username: req.body.username }, function(err, result) {
        console.log(result);
        if (err) {
            res.status(500).json(err);

        } else if (result != null) {
            //req.body.password == result["password"]
            console.log(bcrypt.compareSync(req.body.password, result["password"]))
            if (bcrypt.compareSync(req.body.password, result["password"])) {
                res.status(200).json({
                    status: "success",
                    data: result
                })

            } else {

                res.status(200).json({
                    status: "failure",
                    data: null
                })

            }
        }


    })

});

router.get('/', (req, res, next) => {
    res.status(200).json({
        name: "E-commerce: Flipkart"
    })
})

module.exports = router;