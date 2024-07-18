// routes/favorite.routes.js
module.exports = (app) => {
    const favoriteController = require("../controllers/favorite.controller.js");
    const { verifyToken } = require("../middlewares/authJwt");
  
    const router = require("express").Router();
  
    // Add a recipe to favorites
    router.post("/add", verifyToken, favoriteController.create);
  
    // Remove a recipe from favorites
    router.delete("/remove", verifyToken, favoriteController.delete);
  
    // Retrieve all favorite recipes of the authenticated user
    router.get("/user/:userId", verifyToken, favoriteController.findAllByUser);
  
    app.use("/api/favorites", router);
  };
  