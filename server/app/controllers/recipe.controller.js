const db = require("../models");
const Recipe = db.recipes;
const Op = db.Op;

// Create and Save a new 
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Recipe
  const { title, author, published = false, 
    imageUrl, cookingTime, prepTime, type, options, servings,
    difficulty, price, kitchen, otherKitchen, 
    ingredients, // Initialize as empty JSON string
    steps, // Initialize as empty JSON string
    likes = 0, views = 0, comments = 0, isPublic = false } = req.body;

    const recipe = {
      title,
      author,
      imageUrl,
      cookingTime,
      prepTime,
      type,
      options,
      servings,
      difficulty,
      price,
      kitchen,
      otherKitchen,
      ingredients: JSON.stringify(ingredients), 
      steps: JSON.stringify(steps), 
      likes,
      views,
      comments,
      isPublic
    };

  // Save Recipe in database
  Recipe.create(recipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Recipe."
      });
    });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Recipe.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      // Create a new response object for error handling
      const errorResponse = { message: err.message || "Some error accurred while retrieving recipes." };
      res.status(500).json(errorResponse); // Send error response with JSON data
    });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipe.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Recipe with id = ${id}`
      });
    });
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Recipe.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Book with id=" + id
      });
    });
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Recipe.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Recipe with id=${id}. Maybe Recipe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Recipe with id=" + id
      });
    });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
  Recipe.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Recipes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all recipes."
      });
    });
};

// Find all published Recipes
exports.findAllPublished = (req, res) => {
  Recipe.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving recipes."
      });
    });
};
