const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prize_order', {
    order_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    prize_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'prize',
        key: 'prize_id'
      }
    },
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    order_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    order_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'prize_order',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
      {
        name: "prize_order_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "prize_order_prize",
        using: "BTREE",
        fields: [
          { name: "prize_id" },
        ]
      },
    ]
  });
};
