const db = require("../models");
const Comment = db.comment;
const Recipe = db.recipes;
const User = db.user;

// Add a comment to a recipe
exports.addComment = async (req, res) => {
  try {
    const { content, recipeId } = req.body;
    const userId = req.userId; // Assumed set by auth middleware

    if (!content || !recipeId) {
      return res.status(400).json({ message: "Content and RecipeId are required" });
    }

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const comment = await Comment.create({ content, userId, recipeId });

    recipe.commentsCount += 1;
    await recipe.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all comments for a recipe
exports.getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;

    if (!recipeId) {
      return res.status(400).json({ message: "RecipeId is required" });
    }

    const comments = await Comment.findAll({
      where: { recipeId },
      include: [{ model: User, as: 'user', attributes: ['username'] }]
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.userId; // Assumed set by auth middleware

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await comment.destroy();

    const recipe = await Recipe.findByPk(comment.recipeId);
    if (recipe) {
      recipe.commentsCount -= 1;
      await recipe.save();
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: error.message });
  }
};
