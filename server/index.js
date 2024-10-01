require('dotenv').config();

const express = require('express')
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path')

const PORT = process.env.PORT || 6000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const start = async () => {
    try {
        await sequelize.authenticate();  // Test the database connection
        await sequelize.sync();  // Sync the models with the database
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log('Failed to start server:', e);
    }
};

start()