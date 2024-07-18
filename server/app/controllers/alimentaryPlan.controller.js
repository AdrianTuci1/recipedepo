const db = require("../models");
const AlimentaryPlan = db.alimentaryPlan;
const Card = db.card;
const User = db.user;

// Create a new alimentary plan
exports.createPlan = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.userId; // Assumed set by auth middleware

    const plan = await AlimentaryPlan.create({ name, userId });
    res.status(201).json(plan);
  } catch (error) {
    console.error('Error creating alimentary plan:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all alimentary plans for a user
exports.getUserPlans = async (req, res) => {
  try {
    const userId = req.userId; // Assumed set by auth middleware

    const plans = await AlimentaryPlan.findAll({ where: { userId } });
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching user plans:', error);
    res.status(500).json({ message: error.message });
  }
};

// Share an alimentary plan
exports.sharePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.userId; // Assumed set by auth middleware

    const plan = await AlimentaryPlan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    if (plan.userId !== userId) {
      return res.status(403).json({ message: "You can only share your own plans" });
    }

    plan.isShared = true;
    await plan.save();

    res.status(200).json({ message: "Plan shared successfully" });
  } catch (error) {
    console.error('Error sharing plan:', error);
    res.status(500).json({ message: error.message });
  }
};

// Add a card to an alimentary plan
exports.addCard = async (req, res) => {
  try {
    const { planId, day, lines } = req.body;

    const plan = await AlimentaryPlan.findByPk(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const cardCount = await Card.count({ where: { planId } });
    if (cardCount >= 7) {
      return res.status(400).json({ message: "A plan can have a maximum of 7 cards" });
    }

    const card = await Card.create({ planId, day, lines });
    res.status(201).json(card);
  } catch (error) {
    console.error('Error adding card:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all cards for an alimentary plan
exports.getCards = async (req, res) => {
  try {
    const { planId } = req.params;

    const cards = await Card.findAll({ where: { planId } });
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ message: error.message });
  }
};
