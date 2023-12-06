const Koa = require('koa');
const path = require('path');
const jwt = require('koa-jwt');
// const route = require('koa-route');
const koaStatic = require('koa-static');
const controller = require('./controller.js');
const koaBody = require('koa-body');
const mount = require('koa-mount');
global.__base = __dirname + '/';
// const {sequelize} = require('./db.js')
const { secret } = require('./util/util');
const { serverPort } = require('./util/enum.js');
const params = process.argv.slice(2)

const isProd = params[0]
global.isProd = isProd


process.on('uncaughtException', (err, origin) => {
  //code to log the errors
  console.log(
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`,
  );
});
// let staticFile = require('./static_file.js');
// let root = '/home/learn/koa/lexue/static'
let staticOption = {

}
const app = new Koa();

//打印日志
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

app.use(async (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, token');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});
app.use(mount('/static', koaStatic(__dirname + '/static', staticOption)));
app.use(mount('/page', koaStatic(__dirname + '/webPage', staticOption)));
// app.use(staticFile('/static/', __dirname + '/static'));
// app.use(koaStatic(__dirname+'/static', staticOption));


// app.use(jwt({ secret: secret }).unless({ path: [/^\/mv_upload\/login/,/^\/danmaku/,/^\/mv_upload\/uploadTemp/,/\/free\//,/\/rollBackVue/] }));

// app.use(mount('/static/avatar',koaStatic(__dirname+'/static/avatar', staticOption)));
// app.use(mount('/static/swipe',koaStatic(__dirname+'/static/swipe', staticOption)));
// app.use(mount('/static/icon',koaStatic(__dirname+'/static/icon', staticOption)));
// app.use(koaStatic(__dirname+'/static/swipe', staticOption));


app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
  }
}));

// var tb = {
//   list: (ctx,next) => {
//     var names = Object.keys(db);
//     ctx.body = data
//   },
//   a:(ctx)=>{
//     console.log('hhh')
//     ctx.body = 'jb'
//   }
// show: (ctx, name) => {
//   var pet = db[name];
//   if (!pet) return ctx.throw('cannot find that pet', 404);
//   ctx.body = pet.name + ' is a ' + pet.species;
// }
// };



app.use(controller());


// app.use(tb.list);
// app.use(route.get('/table',tb.list))
// app.use(route.get('/test',tb.a))
// app.use(route.get('/pets/:name', pets.show));

// response
// app.use( async (ctx,next) => {
//   ctx.body = 'Hello Koa';
//   await next()
// });

// app.use(async function (ctx, next) {
//   console.log('>> one');
//   let s = await next();
//   console.log('<< one');
//   console.log(s)
// });

// app.use(async function (ctx, next) {
//   console.log('>> two');
//   ctx.body = 'two';
//   console.log('<< two');
//   return 'sb'
// });

// app.use(async function (ctx, next) {
//   console.log('>> three');
//   await next();
//   console.log('<< three');
// });

app.listen(serverPort);
console.log(`app started at port ${serverPort}...`);


