const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_subpost', {
    subpost_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    subpost_content: {
      type: DataTypes.STRING(5000),
      allowNull: false
    },
    post_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'lost_post',
        key: 'post_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_subpost',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "subpost_id" },
        ]
      },
      {
        name: "user_subpost_post",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "user_subpost_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
