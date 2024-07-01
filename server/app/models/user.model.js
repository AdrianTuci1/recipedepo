module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      // Options
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  User.associate = function(models) {
    User.hasMany(models.recipe, {
      foreignKey: 'userId',
      as: 'recipes'
    });
  };

  return User;
};
