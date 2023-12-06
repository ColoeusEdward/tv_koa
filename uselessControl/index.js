var child_process = require('child_process');
var fs = require('fs')
const path = require('path');

var myPath = '/home/learn/koa/lexue/'
let isIterable = require('../util/util.js').isIterable

var upload = async (ctx, next) => {
  let totalPath = [] //保存所有创建过的文件夹路径
  switch (ctx.params.dir) {
    case 'dist':
      myPath = '/home/learn/koa/lexue/'
      uploadDist()
      break;
    case 'record':
      myPath = '/root/pm_s/record/'
      uploadRecord()
      break;
    case 'record/android':
      myPath = '/root/pm_s/record/'
      uploadRecord('android')
      break;
    case 'dist-backup':
      myPath = '/home/learn/koa/lexue/backup'
      uploadDist()
      break;
    case 'avatar':
      myPath = '/home/learn/koa/lexue/static/avatar'
      uploadAavatar()
      break;
    default:
      return ctx.body = '乱输你妈呢'
      break;
  }
  return ctx.body = "上传成功！";

  function uploadAavatar(){
    
  }

  function uploadDist() {
    try {
      deleteDist()
    } catch (e) {
      console.log(e)
      return
    }
    // 上传多个文件
    const files = ctx.request.files.file; // 获取上传文件
    // console.log(files);
    if (isIterable(files)) {
      for (let file of files) {
        // 创建可读流
        buildDir(file, 'dist')
        // return

        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let filePath = path.join(myPath, 'dist') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
      }
    } else {
      // 上传单个文件
      const file = ctx.request.files.file; // 获取上传文件
      // console.log(file);
      // 
      buildDir(file, 'dist')
      // return

      const reader = fs.createReadStream(file.path);
      let filePath = path.join(myPath, 'dist') + `/${file.name}`;
      console.log(filePath);
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      // console.log('nonono');
    }
  }

  function uploadRecord(plat) {
    // 上传多个文件
    const files = ctx.request.files.file; // 获取上传文件
    // console.log(files);
    if (isIterable(files)) {
      for (let file of files) {
        // 创建可读流
        buildDir(file, 'temp')
        // return

        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名

        // if(plat=='android'){
        //   file.name = file.name.slice(1)
        // }
        let filePath = path.join(myPath, 'temp') + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
      }
    } else {
      // 上传单个文件
      const file = ctx.request.files.file; // 获取上传文件
      // console.log(file);
      // 
      buildDir(file, 'temp')
      // return

      const reader = fs.createReadStream(file.path);
      // if(plat=='android'){
      //   file.name = file.name.slice(1)
      // }
      let filePath = path.join(myPath, 'temp') + `/${file.name}`;
      console.log(filePath);
      // 创建可写流
      const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
      reader.pipe(upStream);
      // console.log('nonono');
    }
  }

  //清空dist文件夹
  function deleteDist() {
    let result = child_process.execSync(`rm -rf ${myPath}/dist/*`)
    // console.log(result);
    // return result
  }

  function buildDir(file, dir) { //自动创建文件夹,dir为指定的用来容纳所有文件的文件夹
    if (file.name.search(`/`)) {
      let NameMath = new RegExp(`(.+/)*(?=.+\..+)`, 'g')
      // console.log(file.name);
      let res = NameMath.exec(file.name)
      let resArr = res[0].split('/')
      // console.log(resArr);
      resArr.pop()
      let inPath = ''

      // 层层创建文件夹
      resArr.forEach(e => { //foreach 不支持continue
        inPath = inPath + e + '/'
        if (totalPath.includes(inPath)) {
          return true
        }
        totalPath.push(inPath)
        console.log(inPath);
        try{
          child_process.execSync(`mkdir ${myPath}/${dir}/${inPath}`)
        }catch(e){
          console.log('mkdir error');
        }
        

      })
      // console.log(resArr);
      // let arr = Array.slice(res)
      // console.log(arr);
    }
  }
};

var freeUpload = async (ctx,next)=>{
  let path = ctx.params.fullpath
  const file = ctx.request.files.file; // 获取上传文件

  const reader = fs.createReadStream(file.path);
      // if(plat=='android'){
      //   file.name = file.name.slice(1)
      // }
  let filePath = path.join(path) + `/${file.name}`;
  console.log(filePath);
      // 创建可写流
  const upStream = fs.createWriteStream(filePath);
      // 可读流通过管道写入可写流
  reader.pipe(upStream);
}



let getTestList = async (ctx, next) => {
  let name = ctx.params.name
  ctx.body = {}
  if (name) {
    ctx.body.name = `fxxk you ${name}`
  }
  ctx.body.data = dataL

};

var fn_signin = async (ctx, next) => {
  var
    name = ctx.request.body.name || '',
    password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
};



module.exports = {
  'POST /upload/:dir': upload,
  // 'POST /freeupload/:fullpath': freeUpload,
  'GET /testList/:name': getTestList
};


let dataL = [{
    id: 10001,
    name: 'Test1',
    role: 'Develop',
    sex: 'Man',
    age: 28,
    address: 'vxe-table 从入门到放弃'
  },
  {
    id: 10002,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou'
  },
  {
    id: 10003,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai'
  },
  {
    id: 10004,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women ',
    age: 24,
    address: 'Shanghai'
  },
  {
    id: 10002,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou'
  },
  {
    id: 10003,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai'
  },
  {
    id: 10004,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women ',
    age: 24,
    address: 'Shanghai'
  },
  {
    id: 10002,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou'
  },
  {
    id: 10003,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai'
  },
  {
    id: 10004,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women ',
    age: 24,
    address: 'Shanghai'
  },
  {
    id: 10002,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou'
  },
  {
    id: 10003,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai'
  },
  {
    id: 10004,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women ',
    age: 24,
    address: 'Shanghai'
  },
  {
    id: 10002,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou'
  },
  {
    id: 10003,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai'
  },
  {
    id: 10004,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women ',
    age: 24,
    address: 'Shanghai'
  },
  {
    id: 10002,
    name: 'Test2',
    role: 'Test',
    sex: 'Women',
    age: 22,
    address: 'Guangzhou'
  },
  {
    id: 10003,
    name: 'Test3',
    role: 'PM',
    sex: 'Man',
    age: 32,
    address: 'Shanghai'
  },
  {
    id: 10004,
    name: 'Test4',
    role: 'Designer',
    sex: 'Women ',
    age: 24,
    address: 'Shanghai'
  }
]