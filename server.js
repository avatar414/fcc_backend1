// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api",(req,res) => {
  const theDate= new Date();
  res.send({"unix" : theDate.getTime(), "utc" : theDate.toUTCString() })
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get(/\/api\/(\d{4})-(\d{2})-(\d{2})/,(req,res) => {
  console.log(req.params)
  const datein= req.params[0] + "-" + req.params[1] + "-" + req.params[2];
  const unixtime= new Date(datein).getTime()
  res.send({"unix" : unixtime, "utc" : new Date(unixtime).toUTCString() })
});

app.get(/\/api\/([-]?[0-9]+$)/,(req,res) => {
  const unixtime= Number(req.params[0]);
  res.send({"unix" : unixtime, "utc" : new Date(unixtime).toUTCString() })
});

app.get("/api/:month/:day/:year",(req,res) => {
  const theDate= new Date(req.params.month + "/" + req.params.day + "/" + req.params.year);
  res.send({"unix" : theDate.getTime(), "utc" : new Date(theDate).toUTCString() })
});


app.get(/\/api\/([\s\S]*)/,(req,res) =>{

    const theDate = new Date(req.params[0]);
    if(theDate.toString() === "Invalid Date")
      res.send({"error" : "Invalid Date"});
    res.send({"unix" : theDate.getTime(), "utc" : theDate.toUTCString()})
})


// listen for requests :)
var listener = app.listen(process.env.PORT ||3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
