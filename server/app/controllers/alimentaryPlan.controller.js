const db = require('../models');
const AlimentaryPlan = db.alimentaryPlan;
const Card = db.card;
const Recipe = db.recipe;

// Create a new Alimentary Plan with cards
exports.createPlan = async (req, res) => {
  try {
    const { name, isShared, cards } = req.body;

    // Create Alimentary Plan
    const plan = await AlimentaryPlan.create({
      name,
      userId: req.userId,
      isShared
    });

    // Add Cards to Plan
    for (const card of cards) {
      await Card.create({
        planId: plan.id,
        day: card.day,
        lines: JSON.stringify(card.lines) // Store lines as JSON
      });
    }

    res.status(201).send(plan);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all Cards for an Alimentary Plan
exports.getCards = async (req, res) => {
  try {
    const { planId } = req.params;
    const cards = await Card.findAll({
      where: { planId },
    });

    // Parse the lines JSON field for each card
    const parsedCards = cards.map(card => ({
      ...card.dataValues,
      lines: JSON.parse(card.lines)
    }));

    res.status(200).send(parsedCards);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get all Alimentary Plans for a user
exports.getUserPlans = async (req, res) => {
  try {
    const { userId } = req;

    const plans = await AlimentaryPlan.findAll({
      where: { userId },
      include: [
        {
          model: Card,
          as: 'cards',
          attributes: [] // We only need the count, not the actual card data
        }
      ],
      attributes: {
        include: [
          [
            db.sequelize.fn('COUNT', db.sequelize.col('cards.id')),
            'days'
          ]
        ]
      },
      group: ['AlimentaryPlan.id']
    });

    res.status(200).send(plans);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get a single Alimentary Plan by ID
exports.getPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const plan = await AlimentaryPlan.findOne({
      where: { id: planId },
      include: [
        {
          model: Card,
          as: 'cards'
        }
      ]
    });

    if (!plan) {
      return res.status(404).send({ message: 'Plan not found' });
    }

    // Parse the lines JSON field for each card
    plan.cards = plan.cards.map(card => ({
      ...card.dataValues,
      lines: JSON.parse(card.lines)
    }));

    res.status(200).send(plan);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update a single Alimentary Plan by ID
exports.updatePlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const { name, isShared, cards } = req.body;

    // Update Alimentary Plan
    const plan = await AlimentaryPlan.findByPk(planId);
    if (!plan) {
      return res.status(404).send({ message: 'Plan not found' });
    }

    await plan.update({ name, isShared });

    // Update Cards
    await Card.destroy({ where: { planId } });
    for (const card of cards) {
      await Card.create({
        planId: plan.id,
        day: card.day,
        lines: JSON.stringify(card.lines) // Store lines as JSON
      });
    }

    res.status(200).send(plan);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
