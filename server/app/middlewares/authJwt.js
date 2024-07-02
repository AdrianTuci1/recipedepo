const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../models");
const User = db.user;

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    token = token.split(" ")[1]; // Assuming 'Bearer <token>'

    const decoded = jwt.verify(token, config.auth.secret);
    req.userId = decoded.id;
    console.log(`Token verified, user ID: ${req.userId}`);
    next();
  } catch (err) {
    console.log('Token verification failed:', err); // Log the error
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    return res.status(500).send({ message: "Error retrieving user roles" });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require Moderator Role!" });
  } catch (err) {
    return res.status(500).send({ message: "Error retrieving user roles" });
  }
};

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator" || roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({ message: "Require Moderator or Admin Role!" });
  } catch (err) {
    return res.status(500).send({ message: "Error retrieving user roles" });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};

module.exports = authJwt;
