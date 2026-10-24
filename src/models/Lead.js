const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Lead = sequelize.define('Lead', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'new',
      'contacted',
      'interested',
      'converted',
      'rejected'
    ),
    allowNull: false,
    defaultValue: 'new',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'leads',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'businessId'],
    },
  ],
});

module.exports = Lead;