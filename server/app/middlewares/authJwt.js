const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  token = token.split(" ")[1]; // Assuming 'Bearer <token>'

  jwt.verify(token, config.auth.secret, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err); // Log the error
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id;
    console.log(`Token verified, user ID: ${req.userId}`);
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      user.getRoles()
        .then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }

          res.status(403).send({
            message: "Require Admin Role!"
          });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving user roles"
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user"
      });
    });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;
