const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

// Get user information by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findByPk(userId, { include: Role })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving user" });
    });
};

// Update user information
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, email, phoneNumber } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.username = username;
    user.email = email;
    user.phoneNumber = phoneNumber;
    if (image) user.image = image;

    await user.save();

    res.send({ message: "User was updated successfully.", user });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error updating user" });
  }
};
// Get all users (only accessible by admins)
exports.getAllUsers = (req, res) => {
  User.findAll({ include: Role })
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving users" });
    });
};
