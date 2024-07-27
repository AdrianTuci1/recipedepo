const db = require("../models");
const Favorite = db.favorite;
const Recipe = db.recipes;
const User = db.user;

// Add a recipe to favorites
exports.create = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    if (!userId || !recipeId) {
      return res.status(400).json({ message: "UserId and RecipeId are required" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const favorite = await Favorite.create({ userId, recipeId });

    recipe.likes += 1;
    await recipe.save();

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error creating favorite:', error);
    res.status(500).json({ message: error.message });
  }
};

// Remove a recipe from favorites
exports.delete = async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    if (!userId || !recipeId) {
      return res.status(400).json({ message: "UserId and RecipeId are required" });
    }

    const favorite = await Favorite.findOne({ where: { userId, recipeId } });
    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await favorite.destroy();

    const recipe = await Recipe.findByPk(recipeId);
    if (recipe) {
      recipe.likes -= 1;
      await recipe.save();
    }

    res.status(204).end(); // Return 204 No Content
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ message: error.message });
  }
};


// Retrieve all favorite recipes of the authenticated user
exports.findAllByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const favorites = await Favorite.findAll({
      where: { userId },
      include: [{
        model: Recipe,
        as: 'recipe'
      }]
    });

    const recipes = favorites.map(fav => fav.recipe);

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error finding favorites:', error);
    res.status(500).json({ message: error.message });
  }
};

// Check if a user has liked a specific recipe
exports.isLikedByUser = async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const favorite = await Favorite.findOne({ where: { userId, recipeId } });
    if (favorite) {
      res.status(200).json({ liked: true });
    } else {
      res.status(200).json({ liked: false });
    }
  } catch (error) {
    console.error('Error checking if liked:', error);
    res.status(500).json({ message: error.message });
  }
};
