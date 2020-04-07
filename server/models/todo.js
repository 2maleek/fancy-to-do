'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Todo extends Model {}
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title can\'t be null'
        },
        notEmpty: {
          msg: 'title can\'t be empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'description can\'t be null'
        },
        notEmpty: {
          msg: 'description can\'t be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'status can\'t be null'
        },
        notEmpty: {
          msg: 'status can\'t be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'due_date can\'t be null'
        },
        notEmpty: {
          msg: 'due_date can\'t be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserID can\'t be null'
        },
        notEmpty: {
          msg: 'UserID can\'t be empty'
        }
      }
    },
  }, 
  { 
    hooks: {
      beforeSave: (todo, options) => {
        console.log('MAsuk')
        if(todo.status !== 'Complete'){
          todo.status = 'Incomplete'
        }
      }
    },
    sequelize })
  Todo.associate = function(models) {
    // associations can be defined here
    // Todo.belongsToMany(models.User, { through: models.Member, foreignKey: 'TodoId' });
    // Todo.hasMany(models.User)

  };
  return Todo;
};