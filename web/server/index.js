import express from 'express';
import dotenv from 'dotenv';
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const boxesRouter = require('./routes/boxes.router');
const scansRouter = require('./routes/scans.router');
const adminsRouter = require('./routes/admins.router');
const authRouter = require('./routes/auth.router');

const app = express();
app.disable('x-powered-by');
const apiPort = 3000;

dotenv.config();

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
