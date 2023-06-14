const express = require('express')
const http = require('http');
const {Sequelize, DataTypes} = require('sequelize');
const location = require('./sequelize/models/location');
const app = express()
app.use(express.json())
// this makes it so that express is capable of reading json
const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/sequelize/config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

app.get('/', (req, res) => {
    console.log("here in the slash route")
    res.send("Hi!")
})

app.get('/Locations', async(req, res)=> {
    const locations = await location.findAll();
    res.json(locations);
    console.log(locations);
})

app.post('/locationsPost', async(req,res) => {
    const {id, deviceName, phoneModel, phoneOS, accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp} = req.body;
    try {
        const newLoc = await location.create({id, deviceName, phoneModel, phoneOS, accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp});
        res.status(201).json(newLoc);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({error: 'Failed !!'});
    }
})

//netstat -an | grep 5435
app.post("/senddata", (req, res) => {
    // have this change data format for sequelize
    try {
        console.log(req.body)
    }
    catch (err) {
        console.error(err.message);
    }
    res.send("Hi!")
});
app.listen(3000)