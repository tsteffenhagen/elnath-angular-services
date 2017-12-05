var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.get('/', function (req, res) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
        if(errorConnectingToDatabase) {
            console.log('there was an error connecting to the database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            db.query(`SELECT car.*, company.name, company.country FROM car
            JOIN company ON company.id = car.company_id;`, function(errorMakingQuery, result) {
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
    var newCar = req.body;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO car (year, model, nickname, company_id)
            VALUES ($1, $2, $3, $4);`, [newCar.year, newCar.make, newCar.nickname, newCar.company_id],
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

router.delete('/:id', function (req, res) {
    var carToDeleteId = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM car WHERE id=$1;`, [carToDeleteId],
                function (errorMakingDatabaseQuery, result) {
                    done();
                    if (errorMakingDatabaseQuery) {
                        console.log('error', errorMakingDatabaseQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });
});

module.exports = router;