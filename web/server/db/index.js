const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.set('debug', true);
mongoose
    .connect(process.env.STRING_URI,
        {
            useNewUrlParser: true,
            server: {
                socketOptions: {
                    keepAlive: 100,
                    connectTimeoutMS: 60000
                }
            }
        }
    ).catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection;

module.exports = db;
