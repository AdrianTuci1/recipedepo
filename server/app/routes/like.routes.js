// routes/likes.js
module.exports = (app) => {
    const likeController = require("../controllers/like.controller.js");
    const { verifyToken } = require("../middlewares/authJwt");

    const router = require("express").Router();

    // Create a new Like
    router.post("/", verifyToken, likeController.addLike);

    // Remove a Like
    router.delete("/", verifyToken, likeController.removeLike);

    // Retrieve Like Count for a recipe
    router.get("/:recipeId", likeController.getLikeCount);

    app.use("/api/likes", router);
};
