const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_role_relation', {
    user_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_open_id'
      }
    },
    role_id: {
      type: DataTypes.STRING(80),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'role',
        key: 'role_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_role_relation',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "role_id" },
        ]
      },
      {
        name: "role_id",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
};
