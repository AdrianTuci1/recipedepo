// routes/comments.js
module.exports = (app) => {
    const commentController = require("../controllers/comment.controller.js");
    const { verifyToken } = require("../middlewares/authJwt");

    const router = require("express").Router();

    // Create a new Comment
    router.post("/", verifyToken, commentController.addComment);

    // Retrieve all Comments for a recipe
    router.get("/:recipeId", commentController.getComments);

    // Delete a Comment with commentId
    router.delete("/:commentId", verifyToken, commentController.deleteComment);

    app.use("/api/comments", router);
};
