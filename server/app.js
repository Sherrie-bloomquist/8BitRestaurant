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
            res.send('success post waitstaff');

        } // end else
    }); // end of pg connect
}); // end of get post waitstaff

app.post('/postMesa', urlEncodedParser, function(req, res) {
    console.log('adding mesa: req.body:', req.body);
    //connect to database
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
        } else {
            console.log('connected to database recieving: '+ req.body);
            client.query('INSERT INTO mesa (mesa_number, capacity, waitstaff_id, mesa_status) values($1, $2, $3, $4)', [req.body.mesa_number, req.body.capacity, req.body.waitstaff_id, req.body.mesa_status]);
            done();
            res.send('successful post mesa');

        } // end else
    }); // end of pg connect
}); // end of get post Mesa

app.put('/putMesa', urlEncodedParser, function(req, res) {
    console.log('Updating: ', req.body);
    //connect to database
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log(err);
        } else {
            console.log("mesa status: "+ req.body.mesa_status);
            console.log('mesa number: '+ req.body.mesa_number);
            console.log('connected to database updating: '+ req.body);
            // client.query('UPDATE mesa SET waitstaff_id =' + req.body.waitstaff_id + 'WHERE mesa_number =' + req.body.mesa_number);
            // UPDATE mesa SET mesa_status = 'dirty' WHERE mesa_number = 42;
            client.query("UPDATE mesa SET mesa_status = '"+ req.body.mesa_status +"' WHERE mesa_number = " + req.body.mesa_number+";");
            done();
            res.send('successful puts mesa');

        } // end else
    }); // end of pg connect
}); // end of get post Mesa

app.use(express.static('public'));
