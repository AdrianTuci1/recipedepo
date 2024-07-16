// routes/views.js
module.exports = (app) => {
    const viewController = require("../controllers/view.controller.js");

    const router = require("express").Router();

    // Increment view count for a recipe
    router.post("/:id/view", viewController.incrementViewCount);

    app.use("/api/views", router);
};
