const express = require('express');
const app = express();

const osUtils = require('os-utils');
const si = require('systeminformation');
const nodeDiskInfo = require('node-disk-info');

const cors = require('cors');
const axios = require('axios');


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

app.get('/achievements/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    axios.get(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${gameId}&key=6D0610741FAFD642B94529145535074A&steamid=76561198240856924`)
        .then(response => {
            res.json(response.data.playerstats.achievements);
        })
        .catch(error => {
            res.status(500).json({ error: error.toString() });
        });
});




app.get('/system-info', (req, res) => {
    si.cpuTemperature().then(temp => {
        osUtils.cpuUsage((cpuPercentage) => {
            nodeDiskInfo.getDiskInfo().then(disks => {
                // Filtrar para obtener solo el disco principal
                // En Linux, el disco principal suele montarse en '/'
                // En Windows, suele ser 'C:'
                const mainDisk = disks.find(disk => disk.mounted === '/' || disk.mounted === 'C:');
                if (!mainDisk) {
                    return res.status(404).json({ error: 'Main disk not found' });
                }
                const freeDiskSpace = mainDisk.available; // Espacio disponible en el disco principal
                res.json({
                    cpuUsage: cpuPercentage,
                    cpuTemperature: temp,
                    freeMemory: osUtils.freememPercentage(),
                    totalMemory: osUtils.totalmem(),
                    systemUptime: osUtils.sysUptime(),
                    freeSSD: osUtils.freemem(),
                    freeDiskSpace: freeDiskSpace // Espacio libre en el disco principal
                });
            }).catch(error => {
                res.status(500).json({ error: error.toString() });
            });
        });
    }).catch(error => {
        res.status(500).json({ error: error.toString() });
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});