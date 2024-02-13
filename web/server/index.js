import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import boxesRouter from './routes/boxes.router';
import scansRouter from './routes/scans.router';
import adminsRouter from './routes/admins.router';
import authRouter from './routes/auth.router';
import insightsRouter from './routes/insights.router';
const mongoose = require('mongoose');

dotenv.config();

const mongoString = process.env.STRING_URI;

mongoose.connect(mongoString, {
    useNewUrlParser: true, // Avoid deprecation warning
    useUnifiedTopology: true, // Avoid deprecation warning
    poolSize: 10, // Maintain up to 10 socket connections, default is 5
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 300000, // Close sockets after 5 minutes of inactivity
});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.disable('x-powered-by');
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE, PATCH",
        credentials: true,
        maxAge: 3600,
    })
);
app.use(bodyParser.raw({ type: 'application/octet-stream' }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', boxesRouter);
app.use('/api', scansRouter);
app.use('/api', adminsRouter);
app.use('/api', authRouter);
app.use('/api', insightsRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

module.exports = app;
