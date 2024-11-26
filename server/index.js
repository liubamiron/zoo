require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

// Define CORS options
const corsOptions = {
    origin: 'http://195.178.106.227',
    methods: 'GET, POST, PUT, DELETE', // Specify allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Central error handling middleware (optional)
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        await sequelize.sync(); // Sync the models with the database
        app.listen(PORT, () => console.log(PORT));
    } catch (e) {
        console.log('Failed to start server:', e);
    }
};

start(); 