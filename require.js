const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const Route = require('./Routes/routes');
const doctor = require('./Routes/doctor');
const patient =require('./Routes/patient');
const symptom = require('./Routes/symptom');
app.use(cors());
app.use(bodyparser.urlencoded({ extended :  true}));
app.use(bodyparser.json());
app.use('/', Route);
app.use('/doctor', doctor);
app.use('/patient',patient);
app.use('/disease',symptom);



module.exports = app;