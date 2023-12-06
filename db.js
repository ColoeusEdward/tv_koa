/*
 * @Author: your name
 * @Date: 2021-04-23 06:02:53
 * @LastEditTime: 2021-04-23 06:02:54
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /lexue/db.js
 */

const Sequelize = require('sequelize')
const sequelize = new Sequelize('test','root','a50541853',{
    host:'localhost',
    dialect:'mysql',
    port:7706,
    // operatorsAliases:0,
    dialectOptions:{
        //字符集
        charset:'utf8mb4',
        // collate:'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true,
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00',//东八时区
    define:{
      freezeTableName: true,
      timestamps: true,
      paranoid: false
    }  
})


//检测连接是否建立成功
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })


// var knex = require('knex')({
//   client: 'mysql2',
//   version: '8.0.22',
//   connection: {
//     host : '127.0.0.1',
//     port:'7706',
//     user : 'root',
//     password : 'a50541853',
//     database : 'test'
//   }
// });

module.exports = {
    sequelize
    // knex
}
