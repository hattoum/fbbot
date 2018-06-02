'use strict'

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const request = require('request')


const app = express()

setInterval(function() {
    http.get("https://calm-mesa-88721.herokuapp.com/webhook");
    console.log("hmmm");
}, 10000); // every 5 minutes (300000)


app.listen(app.get('port'), function() {
  console.log("running: port")
})

