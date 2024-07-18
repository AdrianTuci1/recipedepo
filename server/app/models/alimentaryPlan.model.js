module.exports = (sequelize, DataTypes) => {
    const AlimentaryPlan = sequelize.define('AlimentaryPlan', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      isShared: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
  
    AlimentaryPlan.associate = function(models) {
      AlimentaryPlan.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
      AlimentaryPlan.hasMany(models.card, { foreignKey: 'planId', as: 'cards' });
    };
  
    return AlimentaryPlan;
  };
  