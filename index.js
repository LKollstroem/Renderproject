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
    var results = '<H1>This is the guestbook log</H1><style>table, td {background-color: powderblue; border: 1px solid black;}</style><table border="1">';
    for(var i =0; i<data.length; i++){
        results +=
        '<tr>'+
        '<td>' +data[i].id+'</td>'+
        '<td>' +data[i].username+'</td>'+
        '<td>' +data[i].country+'</td>'+
        '<td>' +data[i].date+'</td>'+
        '<td>' +data[i].message+'</td>'+
        '</tr>';
    }
    res.send(results);
});
//serve the form to the user
app.get('/newmessage', function (req, res){
    res.sendFile(__dirname + '/newmessage.html');
});
//choose where to post
app.post('/newmessage', function (req, res) {
    var data = require('./guestbook.json');
    var id = data.length + 1;
    var username = req.body.username;
    var country = req.body.country;
    var message = req.body.message;
//but first check if empty fields
    if(username === "" || country === "" || message === ""){
        res.send('Please fill in all fields!');
    }else{

//data to push to table        
    data.push({
        "id": id,
        "username": req.body.username, 
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
        }       
});
        
//Show the ajaxmessage html form
app.get('/ajaxmessage', function (req, res){
    res.sendFile(__dirname + '/ajaxmessage.html');
});    

//set web server to listen to port
app.listen(8081, function(){
    console.log('Example app listening on port 8081');
});