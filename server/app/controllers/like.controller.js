// controllers/likeController.js
const db = require('../models');
const Like = db.Like;

exports.addLike = async (req, res) => {
    try {
        const { recipeId, userId } = req.body;
        const like = await Like.create({ recipeId, userId });
        res.status(201).send(like);
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while adding the like." });
    }
};

exports.removeLike = async (req, res) => {
    try {
        const { recipeId, userId } = req.body;
        await Like.destroy({ where: { recipeId, userId } });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while removing the like." });
    }
};

exports.getLikeCount = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const likeCount = await Like.count({ where: { recipeId } });
        res.status(200).send({ likeCount });
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving the like count." });
    }
};