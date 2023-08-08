const express = require("express");
const Result = require("../symptomdb");
//const test = require('../maindb');
// const Mapping = require("./Operations");
const Router = express.Router();
Router.get("/Read:_ID", (req, res) => {
  const data = req.params._ID;
  const Details =  data;
  console.log(Details);
  Result("disease", "Read", Details)
    .then((result) => {
      res.send({ Message: result.Message, Result: result.rows });
      //res.json(result.rows);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = Router;