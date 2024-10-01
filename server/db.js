const {Sequelize} = require ('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: !isProduction, // Enable logging only in development mode
    }
)