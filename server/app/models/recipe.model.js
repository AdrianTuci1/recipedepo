
module.exports = (sequelize, Sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "recipe", // Model name
    {
      // Model attributes
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false // Ensure title is required
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // ... Add additional attributes as needed ...
      cookingTime: {
        type: DataTypes.STRING
      },
      prepTime: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      options: {
        type: DataTypes.STRING
      },
      servings: {
        type: DataTypes.INTEGER
      },
      difficulty: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 4
        }
      },
      kitchen: {
        type: DataTypes.STRING
      },
      // ... Consider adding separate fields for ingredients and instructions ...
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      comments: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      ingredients: {
        type: DataTypes.TEXT,
      },
      steps: {
        type: DataTypes.TEXT,
      },
      author: {
        type: DataTypes.STRING
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: 'users', // Name of the User model
          key: 'id'
        }
    }},
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  Recipe.associate = function(models) {
    Recipe.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user'
    });
    Recipe.hasMany(models.Comment, { foreignKey: 'recipeId', as: 'comments' });
    Recipe.hasMany(models.Like, { foreignKey: 'recipeId', as: 'likes' });
  };

  return Recipe;
};
