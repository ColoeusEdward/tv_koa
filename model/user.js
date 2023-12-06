const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_open_id: {
      type: DataTypes.STRING(200),
      allowNull: false,
      primaryKey: true
    },
    session_key: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    phone_num: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    age: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    college: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    classs: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    intro: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    credit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    student_id: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    freezeTableName: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_open_id" },
        ]
      },
    ]
  });
};
