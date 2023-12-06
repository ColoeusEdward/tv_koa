const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notify', {
    notify_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING(8000),
      allowNull: true
    },
    notify_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notify',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notify_id" },
        ]
      },
    ]
  });
};
