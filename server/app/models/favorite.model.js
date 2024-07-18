module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('favorite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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

  Favorite.associate = function(models) {
    Favorite.belongsTo(models.user, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Favorite.belongsTo(models.recipe, { foreignKey: 'recipeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };

  return Favorite;
};
