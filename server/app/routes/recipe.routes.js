module.exports = app => {
  const recipeController = require("../controllers/recipe.controller.js");

  const router = require("express").Router();

  // Create a new Book
  router.post("/", recipeController.create);

  // Retrieve all Books
  router.get("/", recipeController.findAll);

  // Retrieve all published Books
  router.get("/published", recipeController.findAllPublished);

  // Retrieve a single Book with id
  router.get("/:id", recipeController.findOne);

  // Update a Book with id
  router.put("/:id", recipeController.update);

  // Delete a Book with id
  router.delete("/:id", recipeController.delete);

  // Delete all Books
  router.delete("/", recipeController.deleteAll);

  app.use("/api/recipes", router);
};
