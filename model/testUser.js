const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../db.js')

const User = sequelize.define('user', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
    // allowNull 默认为 true
  },
  age: {
    type: DataTypes.INTEGER(3)
    // allowNull 默认为 true
  }
}, {
  // 这是其他模型参数
});

module.exports = {
  User
};
