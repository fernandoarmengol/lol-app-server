const express = require('express')
const router = express.Router()
const https = require('https')
const app = require('../app')

router.get('/sum/:name', (req, res) => {
    https.get(('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + req.params.name + '?api_key=' + app.api), (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.send(data);
        });
    }).on("error", (err) => {
        res.send("Error: " + err.message);
    });
})

router.get('/matches/:puuid', (req, res) => {
    https.get(('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' + req.params.puuid + '/ids?start=0&count=20&api_key=' + app.api), (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.send(data);
        });
    }).on("error", (err) => {
        return "Error: " + err.message;
    });
})

router.get('/match/:matchid', (req, res) => {
    https.get(('https://europe.api.riotgames.com/lol/match/v5/matches/' + req.params.matchid + '?api_key=' + app.api), (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            res.send(data);
        });
    }).on("error", (err) => {
        return "Error: " + err.message;
    });
})

module.exports = router