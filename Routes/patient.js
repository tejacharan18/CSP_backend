const express = require("express");
const Result = require("../patientdb");
//const test = require('../maindb');
// const Mapping = require("./Operations");
const Router = express.Router();

Router.post("/Insert", (req, res) => {
  let Details = req.body;
  console.log(Details);
  Result("patient", "Insert", Details)
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
Router.delete("/Delete:ID", (req, res) => {
  let Details = req.params.ID;
  Result("patient", "Delete", Details)
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
Router.put("/Update:ID", (req, res) => {
  let Details = req.params.ID;
  let UpdatedDetails = req.body;
  console.log(UpdatedDetails);
  console.log(Details);
  Result("patient", "Update", Details, UpdatedDetails)
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
Router.get("/Read:_ID", (req, res) => {
  const Details = req.params._ID;
  Result("patient", "Read", Details)
    .then((result) => {
      res.send({ Message: result.Message, Result: result.rows });
      //res.json(result.rows);
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

Router.get("/View:_ID", (req, res) => {
  const Details = req.params._ID;
  Result("patient", "View", Details)
    .then((result) => {
      res.send({ Message: result.Message, Result: result.rows });
   
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
});


 
module.exports = Router;