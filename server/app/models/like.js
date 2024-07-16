module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    Like.associate = models => {
        Like.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
        Like.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Like;
};