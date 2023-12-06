const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_lost_history', {
    history_id: {
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
    lost_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'lost_article',
        key: 'lost_id'
      }
    },
    read_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user_lost_history',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "history_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "lost_id",
        using: "BTREE",
        fields: [
          { name: "lost_id" },
        ]
      },
    ]
  });
};
