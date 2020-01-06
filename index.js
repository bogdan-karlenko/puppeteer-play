const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const exportController = require('./src/controllers/export.controller');

dotenv.config();

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

    const app = express();

    app.use(cors());

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get('/ping', (req, res) => {
      res.send('OK\n');
    });

    app.use('/export', exportController);


    app.listen(PORT, HOST);
    console.log(`Running on http://${HOST}:${PORT}`);
