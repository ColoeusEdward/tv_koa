const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prize', {
    prize_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    prize_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    prize_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    prize_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 50
    },
    prize_pic: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    prize_description: {
      type: DataTypes.STRING(5000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'prize',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "prize_id" },
        ]
      },
    ]
  });
};
