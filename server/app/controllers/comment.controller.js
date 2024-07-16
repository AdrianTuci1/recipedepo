// controllers/commentController.js
const db = require('../models');
const Comment = db.Comment;

exports.addComment = async (req, res) => {
    try {
        const { recipeId, userId, commentText } = req.body;
        const comment = await Comment.create({ recipeId, userId, commentText });
        res.status(201).send(comment);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while adding the comment." });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const comments = await Comment.findAll({ where: { recipeId } });
        res.status(200).send(comments);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving comments." });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comment.destroy({ where: { id: commentId } });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while deleting the comment." });
    }
};


