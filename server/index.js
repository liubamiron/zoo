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
const allowedOrigins = ['http://localhost:5173', 'http://195.178.106.227'];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like Postman) or validate the origin
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies and credentials
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

// Central error handling middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate(); // Test the database connection
        await sequelize.sync(); // Sync the models with the database
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log('Failed to start server:', e);
    }
};

start();
