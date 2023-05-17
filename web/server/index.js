import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from './db';
import boxesRouter from './routes/boxes.router';
import scansRouter from './routes/scans.router';
import adminsRouter from './routes/admins.router';
import authRouter from './routes/auth.router';

dotenv.config();

const app = express();
app.disable('x-powered-by');
const apiPort = 3000;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', boxesRouter);
app.use('/api', scansRouter);
app.use('/api', adminsRouter);
app.use('/api', authRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
