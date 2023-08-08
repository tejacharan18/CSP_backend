const express = require("express");
const Result = require("../database");
//const Mapping = require("./Operations");
const Router = express.Router();
Router.get("/", function (req, res) {
  res.send("Welcomee...!!!");
});
Router.get("/doctor/select",function(req,res){
    const sql=`SELECT * FROM doctor`;
    Result(sql)
        .then((result)=>{
            res.send(result.rows);
        })
        .catch((err)=>{
            res.send(err);
        });
});Router.get("/patient/select",function(req,res){
    const sql=`SELECT * FROM patient`;
    Result(sql)
        .then((result)=>{
            res.send(result.rows);
        })
        .catch((err)=>{
            res.send(err);
        });
});
Router.get("/doctor/licence",function(req,res){
    const sql=`SELECT licence_num FROM doctor`;
    Result(sql)
        .then((result)=>{
            res.send(result.rows);
        })
        .catch((err)=>{
            res.send(err);
        });
});

module.exports = Router;