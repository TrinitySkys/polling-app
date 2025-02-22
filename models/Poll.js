const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Poll = sequelize.define('Poll', {
  question: { type: DataTypes.STRING, allowNull: false },
  options: { type: DataTypes.JSON, allowNull: false },
  votes: { type: DataTypes.JSON, allowNull: true, defaultValue: {} }
});

module.exports = Poll;
