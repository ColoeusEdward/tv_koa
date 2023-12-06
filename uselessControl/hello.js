/*
 * @Author: your name
 * @Date: 2021-04-23 08:45:53
 * @LastEditTime: 2021-04-23 08:52:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/controller/hello.js
 */
var fn_hello = async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
  'GET /hello/:name': fn_hello
};