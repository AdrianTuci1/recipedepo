module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('Card', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'alimentaryPlans',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 7
        }
      },
      lines: {
        type: DataTypes.JSON, // This will store an array of text/recipe IDs
        allowNull: true
      }
    });
  
    Card.associate = function(models) {
      Card.belongsTo(models.alimentaryPlan, { foreignKey: 'planId', as: 'plan' });
    };
  
    return Card;
  };
  