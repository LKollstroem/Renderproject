var express = require('express');
var fs = require("fs");
//require library into code
var app = express();
//require form data module
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

//create routes
app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/guestbook', function (req, res){
    var data = require('./guestbook.json');
    //pare data to make it look good
    var results = '<table border="1"> ';
    for(var i =0; i<data.length; i++){
        results +=
        '<tr>'+
        '<td>' +data[i].id+'</td>'+
        '<td>' +data[i].username+'</td>'+
        '<td>' +data[i].country+'</td>'+
        '<td>' +data[i].date+'</td>'+
        '<td>' +data[i].message+'</td>'+
        '</tr>';
        //maybe id/username /country etc should start with Capital letter or small
    }
    res.send(results);
});
//serve the form to the user
app.get('/newmessage', function (req, res){
    res.sendFile(__dirname + '/newmessage.html');
});

app.post('/newmessage', function (req, res) {
    var data = require('./guestbook.json');
    data.push({
        "username": req.body.username, //Only the id and username is not working!
        "country": req.body.country,
        "message": req.body.message,
        "date": new Date()  
    });
//convert to string format
    var jsonStr = JSON.stringify(data);
//write data to a file
fs.writeFile('guestbook.json', jsonStr, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
    });
    res.send('saved the data to a file, go to /guestbook to see file');
});
//New function
app.get('/ajaxmessage', function (req, res){
    res.sendFile(__dirname + '/ajaxmessage.html');
});

//set web server to listen to port
app.listen(8081, function(){
    console.log('Example app listening on port 8081');
});