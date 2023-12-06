const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('credit_detail', {
    credit_detail_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(80),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    }
  }, {
    sequelize,
    tableName: 'credit_detail',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "credit_detail_id" },
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
