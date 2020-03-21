var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

const RESULT=[{"Death": "0", "S. No.": "1", "Total Confirmed cases (Indian National)": "3", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Andhra Pradesh", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "2", "Total Confirmed cases (Indian National)": "1", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Chhattisgarh", "Cured/Discharged/Migrated": "0"}, {"Death": "1", "S. No.": "3", "Total Confirmed cases (Indian National)": "25", "Total Confirmed cases ( Foreign National )": "1", "Name of State / UT": "Delhi", "Cured/Discharged/Migrated": "5"}, {"Death": "0", "S. No.": "4", "Total Confirmed cases (Indian National)": "7", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Gujarat", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "5", "Total Confirmed cases (Indian National)": "3", "Total Confirmed cases ( Foreign National )": "14", "Name of State / UT": "Haryana", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "6", "Total Confirmed cases (Indian National)": "2", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Himachal Pradesh", "Cured/Discharged/Migrated": "0"}, {"Death": "1", "S. No.": "7", "Total Confirmed cases (Indian National)": "15", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Karnataka", "Cured/Discharged/Migrated": "1"}, {"Death": "0", "S. No.": "8", "Total Confirmed cases (Indian National)": "33", "Total Confirmed cases ( Foreign National )": "7", "Name of State / UT": "Kerala", "Cured/Discharged/Migrated": "3"}, {"Death": "0", "S. No.": "9", "Total Confirmed cases (Indian National)": "4", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Madhya Pradesh", "Cured/Discharged/Migrated": "0"}, {"Death": "1", "S. No.": "10", "Total Confirmed cases (Indian National)": "49", "Total Confirmed cases ( Foreign National )": "3", "Name of State / UT": "Maharashtra", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "11", "Total Confirmed cases (Indian National)": "2", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Odisha", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "12", "Total Confirmed cases (Indian National)": "1", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Puducherry", "Cured/Discharged/Migrated": "0"}, {"Death": "1", "S. No.": "13", "Total Confirmed cases (Indian National)": "2", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Punjab", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "14", "Total Confirmed cases (Indian National)": "15", "Total Confirmed cases ( Foreign National )": "2", "Name of State / UT": "Rajasthan", "Cured/Discharged/Migrated": "3"}, {"Death": "0", "S. No.": "15", "Total Confirmed cases (Indian National)": "3", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Tamil Nadu", "Cured/Discharged/Migrated": "1"}, {"Death": "0", "S. No.": "16", "Total Confirmed cases (Indian National)": "8", "Total Confirmed cases ( Foreign National )": "11", "Name of State / UT": "Telengana", "Cured/Discharged/Migrated": "1"}, {"Death": "0", "S. No.": "17", "Total Confirmed cases (Indian National)": "1", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Chandigarh", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "18", "Total Confirmed cases (Indian National)": "4", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Jammu and Kashmir", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "19", "Total Confirmed cases (Indian National)": "13", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Ladakh", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "20", "Total Confirmed cases (Indian National)": "23", "Total Confirmed cases ( Foreign National )": "1", "Name of State / UT": "Uttar Pradesh", "Cured/Discharged/Migrated": "9"}, {"Death": "0", "S. No.": "21", "Total Confirmed cases (Indian National)": "3", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "Uttarakhand", "Cured/Discharged/Migrated": "0"}, {"Death": "0", "S. No.": "22", "Total Confirmed cases (Indian National)": "2", "Total Confirmed cases ( Foreign National )": "0", "Name of State / UT": "West Bengal", "Cured/Discharged/Migrated": "0"}, {"Cured/Discharged/Migrated": "\n23\n", "Total Confirmed cases ( Foreign National )": "\n39 #\n", "Total Confirmed cases (Indian National)": "219 #", "Death": "\n4\n"}];

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

const port= process.env.PORT;


app.get("/",(req,res)=>{
    res.send('Corono Bot Running Successfully')
    })

app.get("/test",(req,res)=>{
res.send('Corono Bot Running Successfully')
})


//This is the route the API will call
app.post('/new-message', function(req, res) {
  const { message } = req.body

  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (!message || message.text.toLowerCase().indexOf('update') < 0) {
    // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
    return res.end()
  }
  axios
    .post(
      'https://api.telegram.org/bot<BOT_TOKEN>/sendMessage',
      {
        chat_id: message.chat.id,
        text: "TOTAL CASES : "+  RESULT[RESULT.length-1]["Total Confirmed cases (Indian National)"]
      }
    )
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

// Finally, start our server
// Start node server
app.listen( port, function() {
    console.log( 'Node server is running on port ' + port);
    });
  
