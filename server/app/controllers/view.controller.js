// controllers/viewController.js
const db = require('../models');
const Recipe = db.Recipe;

exports.incrementViewCount = async (req, res) => {
    try {
        const { id } = req.params;
        await Recipe.increment('views', { where: { id } });
        res.status(200).send();
    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while incrementing the view count." });
    }
};