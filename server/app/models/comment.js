module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        commentText: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    Comment.associate = models => {
        Comment.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
        Comment.belongsTo(models.User, { foreignKey: 'userId' });
    };
    return Comment;
};