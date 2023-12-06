const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('private_chat_detail', {
    msg_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    from_user_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "发送贴文回复的用户",
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    content: {
      type: DataTypes.STRING(2000),
      allowNull: true,
      comment: "用户回复内容"
    },
    msg_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    chat_id: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'private_chat_detail',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "msg_id" },
        ]
      },
      {
        name: "chat",
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
      {
        name: "user",
        using: "BTREE",
        fields: [
          { name: "from_user_id" },
        ]
      },
    ]
  });
};
