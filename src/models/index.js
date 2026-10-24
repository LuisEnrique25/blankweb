const User = require('./User');
const Business = require('./Business');
const Lead = require('./Lead');

User.hasMany(Lead, {
  foreignKey: 'userId',
  as: 'leads',
});

Lead.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

Business.hasMany(Lead, {
  foreignKey: 'businessId',
  as: 'leads',
});

Lead.belongsTo(Business, {
  foreignKey: 'businessId',
  as: 'business',
});

module.exports = {
  User,
  Business,
  Lead,
};