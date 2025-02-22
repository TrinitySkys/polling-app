const { sequelize } = require('../config/database');
const Poll = require('./Poll');
const User = require('./User');

module.exports = { sequelize, Poll, User };
