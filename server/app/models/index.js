const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,
    pool: {
      max: config.db.pool.max,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.recipes = require("./recipe.model.js")(sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, DataTypes);
db.favorite = require("./favorite.model.js")(sequelize, DataTypes);
db.comment = require("./comment.model.js")(sequelize, DataTypes);

// Define associations for favorites
db.user.belongsToMany(db.recipes, { through: db.favorite, foreignKey: 'userId', as: 'favoritedRecipes' });
db.recipes.belongsToMany(db.user, { through: db.favorite, foreignKey: 'recipeId', as: 'favoritedBy' });

// Define other associations
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});
db.user.hasMany(db.comment, { foreignKey: 'userId', as: 'comments' });
db.recipes.hasMany(db.comment, { foreignKey: 'recipeId', as: 'comments' });

module.exports = db;
