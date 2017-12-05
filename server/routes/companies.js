var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
        if(errorConnectingToDatabase) {
            console.log('there was an error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            db.query('SELECT * FROM company;', function(errorMakingQuery, result) {
                done();
                if(errorMakingQuery) {
                    console.log('there was an error making the query', errorMakingQuery);
                    res.sendStatus(500);                    
                } else {
                    res.send(result.rows);
                }
            })
        }
    })
}); //end router.get


router.post('/', function (req, res) {
    var newCompany = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO company (name, country)
                          VALUES($1, $2);`, [newCompany.company, newCompany.country],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    });
});


module.exports = router;
