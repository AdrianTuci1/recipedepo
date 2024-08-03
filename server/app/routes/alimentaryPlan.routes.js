module.exports = (app) => {
  const alimentaryPlanController = require('../controllers/alimentaryPlan.controller.js');
  const { verifyToken } = require('../middlewares/authJwt');

  const router = require('express').Router();

  // Create a new Alimentary Plan
  router.post('/', verifyToken, alimentaryPlanController.createPlan);

  // Get all Cards for an Alimentary Plan
  router.get('/:planId/cards', verifyToken, alimentaryPlanController.getCards);

  // Get all Alimentary Plans for a user
  router.get('/', verifyToken, alimentaryPlanController.getUserPlans);

  // Get a specific Alimentary Plan
  router.get('/:planId', verifyToken, alimentaryPlanController.getPlan);

  // Update a specific Alimentary Plan
  router.put('/:planId', verifyToken, alimentaryPlanController.updatePlan);

  // Remove a specific Alimentary Plan
  router.delete('/:planId', verifyToken, alimentaryPlanController.removePlan);

  app.use('/api/alimentaryPlans', router);
};
