module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      // Options
      timestamps: true,
      underscored: true, // Corrected typo
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  Role.associate = function(models) {
    Role.belongsToMany(models.user, {
      through: 'user_roles',
      foreignKey: 'role_id',
      otherKey: 'user_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  
  return Role;
};
