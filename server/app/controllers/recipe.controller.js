const db = require("../models");
const Recipe = db.recipes;
const User = db.user;
const Op = db.Op;

// Create and Save a new Recipe
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  try {
    // Create a Recipe
    const { 
      title, cookingTime, prepTime, type, options, servings,
      difficulty, price, kitchen, ingredients, steps, isPublic 
    } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const userId = req.userId; // Assumed set by auth middleware
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const recipe = await Recipe.create({
      title, imageUrl, cookingTime, prepTime, type, options, servings,
      difficulty, price, kitchen, ingredients: JSON.stringify(ingredients),
      steps: JSON.stringify(steps), isPublic, userId , author: user.username // Assuming `author` to be `req.userId`
    });

    res.send(recipe);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Recipe."
    });
  }
};
// Retrieve all Recipes from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  try {
    const recipes = await Recipe.findAll({ 
      where: condition, 
    });
    res.send(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message || "Some error occurred while retrieving recipes." });
  }
};

// Find a single Recipe with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await Recipe.findByPk(id);
    if (recipe) {
      res.send(recipe);
    } else {
      res.status(404).send({ message: `Recipe with id=${id} not found` });
    }
  } catch (error) {
    res.status(500).send({ message: `Error retrieving Recipe with id=${id}` });
  }
};

// Update a Recipe by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    console.log(`Updating recipe with ID: ${id}`);
    console.log('Update data:', req.body); // Log the incoming data

    // Destructure the fields from the request body
    const { 
      title, cookingTime, prepTime, type, options, servings,
      difficulty, price, kitchen, ingredients, steps, isPublic 
    } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create an update object, stringifying ingredients and steps
    const updateData = {
      title,
      imageUrl,
      cookingTime,
      prepTime,
      type,
      options,
      servings,
      difficulty,
      price,
      kitchen,
      ingredients: JSON.stringify(ingredients),
      steps: JSON.stringify(steps),
      isPublic
    };

    const [num] = await Recipe.update(updateData, { where: { id } });
    if (num === 1) {
      res.send({ message: "Recipe was updated successfully." });
    } else {
      res.send({ message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found or req.body is empty!` });
    }
  } catch (error) {
    console.error('Error updating recipe:', error); // Log the error
    res.status(500).send({ message: "Error updating Recipe with id=" + id });
  }
};

// Delete a Recipe with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId; // Assuming req.user contains the authenticated user

  try {
    const num = await Recipe.destroy({ where: { id, userId } });
    if (num === 1) {
      res.send({ message: "Recipe was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!` });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete Recipe with id=" + id });
  }
};

// Delete all Recipes from the database.
exports.deleteAll = async (req, res) => {
  try {
    const nums = await Recipe.destroy({ where: {}, truncate: false });
    res.send({ message: `${nums} Recipes were deleted successfully!` });
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while removing all recipes." });
  }
};

// Find all public Recipes
exports.findAllPublic = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ 
      where: { isPublic: true, approved: true },
    });
    res.send(recipes);
  } catch (error) {
    res.status(500).send({ message: error.message || "Some error occurred while retrieving public recipes." });
  }
};

// Get all recipes for the authenticated user
exports.findUserRecipes = (req, res) => {
  const userId = req.userId;
  console.log(`Fetching recipes for user ID: ${userId}`); // Log user ID

  Recipe.findAll({
    where: {
      userId: userId
    },
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error('Error fetching user recipes:', err); // Log the error
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving user recipes."
    });
  });
};



// Send a Recipe for approval (user)
exports.requestApproval = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.userId;

    const [updated] = await Recipe.update({ isPublic: true }, { where: { id, userId } });

    if (updated) {
      const recipe = await Recipe.findByPk(id);
      return res.send({ message: "Recipe was sent for approval successfully.", recipe });
    }

    throw new Error(`Cannot send Recipe with id=${id} for approval. Maybe Recipe was not found!`);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error sending Recipe with id=${id} for approval`
    });
  }
};

// Retrieve all Recipes awaiting approval (admin)
exports.findAllPendingApproval = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({ where: { isPublic: true, approved: false } });
    res.send(recipes);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving recipes pending approval."
    });
  }
};

// Approve or deny a Recipe (admin)
exports.approveOrDenyRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const { approve } = req.body; // approve should be true or false

    const [updated] = await Recipe.update({ approved: approve }, { where: { id } });

    if (updated) {
      const updatedRecipe = await Recipe.findByPk(id);
      return res.send({ message: `Recipe was ${approve ? 'approved' : 'denied'} successfully.`, recipe: updatedRecipe });
    }

    throw new Error(`Cannot update approval status of Recipe with id=${id}. Maybe Recipe was not found!`);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating approval status of Recipe with id=${id}`
    });
  }
};

// Increment view count for a recipe
exports.incrementViews = async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    recipe.views += 1;
    await recipe.save();

    res.status(200).json({ message: "Recipe view count incremented", views: recipe.views });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch 10 most favorited recipes
exports.getTopFavoritedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      limit: 10,
      order: [['likes', 'DESC']],
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching top favorited recipes:', error);
    res.status(500).json({ message: error.message });
  }
};

