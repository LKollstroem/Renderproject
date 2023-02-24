const PORT = process.env.PORT || 3000;
var http = require("http");
//create server object
http
    .createServer(function(request,response){
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write('<figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ54AGakz6Q_pzbtoIQ8us_R61sDJlt7OPfgg&usqp=CAU" style="width:600px; height:300px"></figure>');
        response.write("Source: https://scoutapm.com/"); //write response to client
        response.end(""); //End response
    })
    .listen(PORT); // The server object listens on port
    // remember first npm init, then npm i express axios, then make changes to package-lock.json:
    // "name": "ws3",
    // "version": "1.0.0",
    //"descriptions": "This is azure project that is changed to render",
    // "main": "index.js",
    //"scripts": {
    //"test": "echo \"Error: no test specified\" && exit 1",
    // "start": "node index.js"
    // },

    // then add read_file_axios.js part
    //and then cd correct folder and node index.js and look at browser http://localhost:3000/