module.exports = (app) => {
  const recipeController = require("../controllers/recipe.controller.js");
  const { verifyToken, isAdmin } = require("../middlewares/authJwt");

  const router = require("express").Router();

  // Create a new Recipe
  router.post("/", verifyToken, recipeController.create);

  // Retrieve all Recipes
  router.get("/", recipeController.findAll);

  // Retrieve all public Recipes
  router.get("/public", recipeController.findAllPublic);

  // Retrieve all Recipes of the authenticated user
  router.get("/user/recipes", verifyToken, recipeController.findUserRecipes);

  // Retrieve all Recipes awaiting approval (admin)
  router.get("/admin/pending", verifyToken, isAdmin, recipeController.findAllPendingApproval);

  // Retrieve a single Recipe with id
  router.get("/:id", recipeController.findOne);

  // Update a Recipe with id
  router.put("/:id", verifyToken, recipeController.update);

  // Delete a Recipe with id
  router.delete("/:id", verifyToken, recipeController.delete);

  // Delete all Recipes
  router.delete("/", verifyToken, recipeController.deleteAll);

  // Approve or deny a Recipe (admin)
  router.put("/:id/approve", verifyToken, isAdmin, recipeController.approveOrDenyRecipe);

  // Send a Recipe for approval (user)
  router.put("/:id/request-approval", verifyToken, recipeController.requestApproval);

  // Increment views
  router.put("/:recipeId/views", recipeController.incrementViews);

  // Fetch 10 most favorited recipes
  router.get("/top/favorites", recipeController.getTopFavoritedRecipes);

  app.use("/api/recipes", router);
};
