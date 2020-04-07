'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    UserId: DataTypes.INTEGER,
    TodoId: DataTypes.INTEGER,
    OwnerId: DataTypes.INTEGER,
  }, {});
  Member.associate = function(models) {
    // associations can be defined here
    Member.belongsTo(models.User);
    Member.belongsTo(models.Todo);
  };
  return Member;
};