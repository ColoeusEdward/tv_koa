const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lost_article', {
    lost_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true
    },
    lost_name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    lost_img: {
      type: DataTypes.JSON,
      allowNull: true
    },
    lost_descr: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    lost_user_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    found_user_id: {
      type: DataTypes.STRING(200),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    reward: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    lost_where: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "未知"
    },
    lost_classs: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "其他"
    }
  }, {
    sequelize,
    tableName: 'lost_article',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "lost_id" },
        ]
      },
      {
        name: "found",
        using: "BTREE",
        fields: [
          { name: "found_user_id" },
        ]
      },
      {
        name: "lost",
        using: "BTREE",
        fields: [
          { name: "lost_user_id" },
        ]
      },
    ]
  });
};
