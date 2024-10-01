const {Sequelize} = require ('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
)

// import { Sequelize } from 'sequelize';
//
// const sequelize = new Sequelize(
//     process.env.DB_NAME,  // Database name
//     process.env.DB_USER,  // Database user
//     process.env.DB_PASSWORD,  // Database password
//     {
//         dialect: 'postgres',  // Database dialect
//         host: process.env.DB_HOST,  // Database host
//         port: process.env.DB_PORT,  // Database port
//     }
// );
//
// export default sequelize;
