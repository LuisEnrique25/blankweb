const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'succes',
        message: 'BlankWeb Api is runnig'
    });
});


module.exports = app; 
