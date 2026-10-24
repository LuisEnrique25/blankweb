const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Business = sequelize.define('Business', {
  osmType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  osmId: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  lastSeenAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'businesses',
  indexes: [
    {
      unique: true,
      fields: ['osmType', 'osmId'],
    },
  ],
});

module.exports = Business;