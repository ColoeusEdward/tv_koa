const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('private_chat_relation', {
    chat_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    another_user_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    }
  }, {
    sequelize,
    tableName: 'private_chat_relation',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
      {
        name: "FK_private_chat_relation_user1",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_private_chat_relation_user2",
        using: "BTREE",
        fields: [
          { name: "another_user_id" },
        ]
      },
    ]
  });
};
