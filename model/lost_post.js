const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lost_post', {
    post_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true
    },
    lost_id: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    post_view: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    post_title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    post_content: {
      type: DataTypes.STRING(800),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'lost_post',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "lost_id",
        using: "BTREE",
        fields: [
          { name: "lost_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
