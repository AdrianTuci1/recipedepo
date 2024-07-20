module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });


  User.associate = function(models) {
    User.hasMany(models.recipe, { foreignKey: 'userId', as: 'recipes', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    User.hasMany(models.favorite, { foreignKey: 'userId', as: 'favorites', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
  };

  return User;
};
