// require('dotenv').config()
// const express = require('express')
// const sequelize = require('./db')
// const models = require('./models/models')
//
// const PORT = process.env.PORT || 5000
//
// const app = express()
//
// const start = async () =>  {
//     try {
//         await sequelize.authenticate()
//         await sequelize.sync()
//         app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`))
//     }
//     catch (e) {
//         console.log(e)
//     }
// }
//
// start()


// import 'dotenv/config';
// import express from 'express';
// import sequelize from './db.js';
// import router from './routes/index.js';
// import {
//     User,
//     Animal,
//     TypeAnimal,
//     Tender,
//     TypeTender,
//     Event,
//     NewsItem,
//     ActivitiesItem,
//     Post,
//     Tag,
//     PostTag,
//     Review,
//     HomePage
// } from './models/models.js';
// import cors from 'cors'

require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require("./routes/index");
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000;

const app = express();

if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode');
    // Add production-specific middleware or settings
} else {
    console.log('Running in development mode');
    // Add development-specific middleware, like logging or debugging
}

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

//errors middleware, last
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate();  // Test the database connection
        await sequelize.sync();  // Sync the models with the database
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error('Failed to start server:', e);
    }
};

start();
