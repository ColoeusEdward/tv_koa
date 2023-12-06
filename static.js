//z作废

const koaStatic = require('koa-static');
let staticOption = {

}

var fn_hello = async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

var staticAvatar = koaStatic('..'+'/static/avatar', staticOption)
var staticSwipe = async (ctx, next) => {
  return koaStatic('..'+'/static/swipe',staticOption)
};



app.use(koaStatic(__dirname+'/static/avatar', staticOption));
app.use(koaStatic(__dirname+'/static/swipe', staticOption));

// module.exports = {
//   'GET /static/avatar/:fileName': staticAvatar,
//   'GET /static/swipe/:fileName': staticSwipe
// };