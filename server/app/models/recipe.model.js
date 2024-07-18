module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
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
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ingredients: {
      type: DataTypes.TEXT
    },
    steps: {
      type: DataTypes.TEXT
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
        model: 'users',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Recipe.associate = function(models) {
    Recipe.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Recipe.hasMany(models.comment, { foreignKey: 'recipeId', as: 'comments', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Recipe.hasMany(models.favorite, { foreignKey: 'recipeId', as: 'favorites', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };

  return Recipe;
};
