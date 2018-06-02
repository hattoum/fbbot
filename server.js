'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')


const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// FUNCTIONS
function checkTime(minu) {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  if(minu == true){
    return hour + ":" + min;
  }else{
    return hour
  }
}
function printTime(){
  console.log(checkTime(true))
}
function catchID(psid){
  lastpsid = psid
}
// ROUTES

app.get('/', function(req, res) {
  res.send("Hi I am a chatbot")
})

let token = "EAACwplzN57sBAMqzLdL5I6KXI99hxjXhN6howNFxsAIwVFt0Ewjl8xWf7Y3gpAG5lwy0rUUMLCptpRGKb9rpAvKxZAZA8JI8dQ29dKZATmUs6PF5CYLfYvxZAntjUwClZCE7aumYeMzEchJNt58r05nAGIIbZC8Jl4Tq5BuX7jP1veH8CIdZA4O"
let hatemID = "1568660883259983"
let jigglyID = "1800824209938408"
let lastpsid = ""
// Facebook 

app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === "blondiebytes") {
    res.send(req.query['hub.challenge'])
  }
  res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = messaging_events[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      let text = event.message.text
      catchID(event.sender.id)
      console.log(sender)
      if(checkTime(false) != "22"){
        sendText(sender,"It is not cute butt o'clock yet!")
        //sendText(sender, "Text echo: " + text.substring(0, 100))  
      }else{
        sendText(sender,"It's cute butt o'clock!!")
      }
      
    }
  }
  res.sendStatus(200)
})

setInterval(function(){
  printTime()
  //console.log(checkTime(false))
},10000)

setInterval(function(){
  if(checkTime(true) == "22:00"){
    sendText(jigglyID, "Ding dong, it's cute butt o'clock!!")
    console.log("The deed is done")
  }
},10000)

function sendText(sender, text) {
  let messageData = {text: text}
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs : {access_token: token},
    method: "POST",
    json: {
      recipient: {id: sender},
      message : messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log("sending error")
    } else if (response.body.error) {
      console.log("response body error")
    }
  })
}
//sendText(jigglyID,"Do you have cute butt yet?")

app.listen(app.get('port'), function() {
  console.log("running: port")
})

