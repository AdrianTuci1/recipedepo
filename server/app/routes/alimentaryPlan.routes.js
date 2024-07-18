module.exports = (app) => {
    const alimentaryPlanController = require("../controllers/alimentaryPlan.controller.js");
    const { verifyToken } = require("../middlewares/authJwt");
  
    const router = require("express").Router();
  
    // Create a new Alimentary Plan
    router.post("/", verifyToken, alimentaryPlanController.createPlan);
  
    // Get all Alimentary Plans for a user
    router.get("/", verifyToken, alimentaryPlanController.getUserPlans);
  
    // Share an Alimentary Plan
    router.put("/:planId/share", verifyToken, alimentaryPlanController.sharePlan);
  
    // Add a card to an Alimentary Plan
    router.post("/card", verifyToken, alimentaryPlanController.addCard);
  
    // Get all cards for an Alimentary Plan
    router.get("/:planId/cards", verifyToken, alimentaryPlanController.getCards);
  
    app.use("/api/alimentaryPlans", router);
  };
  