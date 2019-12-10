// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// if date input is left blank respond with current date 
app.get("/api/timestamp", function(req, res) {
  
  let tempDate = new Date()   
  res.json({unix: tempDate.valueOf(), utc: tempDate.toUTCString()})
  
})

// API for returning time stamp 
app.get("/api/timestamp/:date_string", function (req, res) {
  
  // regex to test for unix time
  let regex = /(\b\-|\-\-+|[^\-0-9])+/g;///\D+/g;
  
  // set tempTime as proper date object
  let tempTime = regex.test(req.params.date_string) ? // test for unix time
      new Date(req.params.date_string) : // if utc time, don't parse, just make date object
      new Date(parseInt(req.params.date_string)); // if unix time parseInt before creating date object
  
  // validity check
  if (tempTime == 'Invalid Date') {
    res.json({error: 'Invalid Date'})
  } else {
    res.json({unix: tempTime.valueOf(), utc: tempTime.toUTCString()})
  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});