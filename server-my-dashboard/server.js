const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get('/games', (req, res) => {
    axios.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=6D0610741FAFD642B94529145535074A&steamid=76561198240856924&include_appinfo=true&format=json')
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            res.status(500).json({ error: error.toString() });
        });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});