const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_lost_collect', {
    user_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    lost_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'lost_article',
        key: 'lost_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_lost_collect',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "lost_id" },
        ]
      },
      {
        name: "user_lost_collect_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "lost_id" },
        ]
      },
    ]
  });
};
