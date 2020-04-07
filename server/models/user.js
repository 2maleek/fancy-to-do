'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name can\'t be null'
        },
        notEmpty: {
          msg: 'name can\'t be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email can\'t be null'
        },
        notEmpty: {
          msg: 'email can\'t be empty'
        },
        isEmail: {
          msg: 'please enter correct email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password can\'t be null'
        },
        notEmpty: {
          msg: 'password can\'t be empty'
        }
      }
    },
  }, 
  { 
    hooks: {
      beforeSave: (user, options) => {
        return hash(user.password)
        .then(hashed => {
          user.password = hashed
        })
      }
    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
    // User.belongsTo(models.Todo, { through: models.Member })
    User.hasMany(models.Todo)
  };
  return User;
};