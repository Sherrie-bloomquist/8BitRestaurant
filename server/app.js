var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var urlEncodedParser = bodyParser.urlencoded({
    extended: true
}); // end var urlEncoderParser
var port = process.env.PORT || 8080;
// create connection string to our database
var connectionString = 'postgres://localhost:5432/grubs';

app.listen(port, function(req, res) {
    console.log('server listening on', port);
}); // end app.listen

app.get('/', function(req, res) {
    console.log('Base url hit!');
    res.sendFile(path.resolve('public/index.html'));
}); // end of base URL

app.get('/getWaitstaff', function(req, res) {
    console.log('Getting waitstaff.');
    //connect to database
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('error connecting to database' + err);
        } else {
            console.log('connected to database');
            var query = client.query('SELECT * from waitstaff');
            var waitstaff = [];
            query.on('row', function(row) {
                waitstaff.push(row);
            }); // end query on row
            query.on('end', function() {
                done();
                console.log('sending array back to client' + waitstaff);
                res.send(waitstaff);
            }); // end query on end
        } // end else
    }); // end of pg connect
}); // end of get getWaitstaff


app.get('/getMesa', function(req, res) {
    console.log('Getting mesa.');
    //connect to database
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('error connecting to database' + err);
        } else {
            console.log('connected to database');
            var query = client.query('SELECT * from mesa');
            var mesa = [];
            query.on('row', function(row) {
                mesa.push(row);
            }); // end query on row
            query.on('end', function() {
                done();
                console.log('sending array back to client' + mesa);
                res.send(mesa);
            }); // end query on end
        } // end else
    }); // end of pg connect
}); // end of get getMesa

app.post('/postWaitstaff', urlEncodedParser, function(req, res) {
    console.log('adding waitstaff: req.body:', req.body);
    //connect to database
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
        } else {
            console.log('connected to database recieving: '+ req.body);
            client.query('INSERT INTO waitstaff(first_name, last_name, active) values($1, $2, $3)', [req.body.first_name, req.body.last_name, req.body.active]);
            done();
            res.send('meow');

        } // end else
    }); // end of pg connect
}); // end of get getMesa

app.use(express.static('public'));
