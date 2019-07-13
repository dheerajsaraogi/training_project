const express = require('express');
const bodyparser=require('body-parser');

const app=express();
const authcontroller = require('../controller/authController');
// const postcontroller = require('../controller/postController');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS")
    next();
});

app.use('/auth', authcontroller);
// app.use('/posts', postcontroller);
app.get('/',(req,res,next)=>{
    res.status(200).json({
        name: 'E-commerce: Flipkart'
    })
})

module.exports=app;