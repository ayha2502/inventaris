const {Sequelize} = require('sequelize');

const db = new Sequelize('authentic_db', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;