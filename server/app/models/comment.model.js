module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recipes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  
    Comment.associate = function(models) {
      Comment.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
      Comment.belongsTo(models.recipe, { foreignKey: 'recipeId', as: 'recipe' });
    };
  
    return Comment;
  };
  