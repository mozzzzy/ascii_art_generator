/*
 * Modules
 */
const express = require('express');
const fs = require('fs');
const util = require('util');
const Aag = require('./modules/Aag');

/*
 * Variables
 */
const aa_filepath = '../var/aa/';
const aa_max_len = 200;
const server_port = 10080;


/*
 * Main
 */
// generate http server
const app = express();
const server = app.listen(server_port, function() {
    console.log('Listening to PORT:' + server.address().port);
});

// set route
app.get('/aag', function(req, res) {
    // get query string
    const queries = req.query;
    // if request has query string 'aa=xxx'
    if(queries['aa']) {
        // get value of query string 'aa'
        let required_aa = queries['aa'];

        // create async reader of each aa file
        const readFileAsync = util.promisify(fs.readFile);

        let async_array = [];
        let target_character_pointer = 0;
        for(qsc = 0; qsc < required_aa.length; qsc ++) {
            let target_character = required_aa.substr(target_character_pointer, 1);
            const eachReadFileAsync = readFileAsync(aa_filepath + target_character, 'utf-8');
            async_array.push(eachReadFileAsync);
            target_character_pointer ++;
        }

        // when all aa files are read
        Promise.all(async_array).then(function(each_aa) {
            aag = new Aag(each_aa);
            res.send(aag.consecutive_aa_obj.aa);
        });
    } else {
        res.send('hello world from ascii art generator.');
    }
});
