'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversations.hasMany(models.Messages, {foreignKey:'conversationId'});
      Conversations.hasMany(models.Participants, {
        onDelete: "CASCADE",foreignKey:'conversationId'});
      Conversations.belongsTo(models.Users, {foreignKey:'createBy'});
    }
  }
  Conversations.init({
    title: DataTypes.STRING,
    createBy: DataTypes.INTEGER,
    conversationImage: DataTypes.STRING,
    type: DataTypes.ENUM('single', 'group')
  }, {
    sequelize,
    modelName: 'Conversations',
  });
  return Conversations;
};