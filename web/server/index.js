import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
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

// const uri = process.env.STRING_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// client.connect(err => {
//   console.log('Connected to database.');
//   // const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

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
