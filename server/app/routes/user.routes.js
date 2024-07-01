const upload = require('../middlewares/upload.middleware');

module.exports = (app) => {
  const userController = require("../controllers/user.controller.js");
  const { verifyToken, isAdmin } = require("../middlewares/authJwt");

  const router = require("express").Router();

  // Get user information by ID (for logged-in user)
  router.get("/:id", verifyToken, userController.getUserById);

  // Update user information by ID (for logged-in user)
  router.put("/:id", verifyToken, upload.single('image'), userController.updateUser);

  // Get all users (only accessible by admins)
  router.get("/", verifyToken, isAdmin, userController.getAllUsers);

  app.use("/api/users", router);
};
