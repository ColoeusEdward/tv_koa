/*
 * @Author: your name
 * @Date: 2021-04-23 06:17:16
 * @LastEditTime: 2021-04-23 06:17:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /lexue/autoModel.js
 */
const SequelizeAuto = require('sequelize-auto')//自动生成model类
const auto = new SequelizeAuto(
    'test',     //数据库的库名
    'root',         //mysql数据库的用户名
    'a50541853',     //mysql数据库的密码
    {
        host: '127.0.0.1',      // 数据库服务器ip
        dialect: 'mysql',
        directory: './model',  // prevents the program from writing to disk
        port: '7706',           // 数据库运行端口
        additional: {
          timestamps: true,
          paranoid: false,
          freezeTableName: true,
        }
    }
)
auto.run(function (err) {
    if (err) throw err;
    // console.log(auto.tables); // table list
    // console.log(auto.foreignKeys); // foreign key list
    console.log('model生成完成')
    //生成models表后，直接执行项目
    // require('./bin/www');
});