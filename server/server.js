const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./app/config/config.js");
const path = require('path');

const app = express();

const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, Recipe house." });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// api routes
require("./app/routes/recipe.routes.js")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/favorite.routes.js")(app);
require("./app/routes/alimentaryPlan.routes.js")(app);

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Sync the database
db.sequelize.sync()
  .then(() => {
    console.log("Database synced with force: true.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });



