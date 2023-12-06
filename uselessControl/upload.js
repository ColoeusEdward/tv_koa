/*
 * @Author: your name
 * @Date: 2021-03-01 02:31:37
 * @LastEditTime: 2023-08-31 01:14:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/controller/upload.js
 */
const free = require('/root/pm_s/record/auto-encode/auto_free')
// const release = require('/root/pm_s/record/auto-encode/auto_release')
const reMp4 = require('/root/pm_s/record/auto-encode/auto_mp4')
const fs = require('fs')
const child_process = require('child_process')
const io = require('socket.io')();
const addr = '/root/pm_s/record'
const {deployUp,upTemp,upBook,deploySun,upElectron} = require('../mixin/upload')
const {buildWs}  = require('../mixin/ws/ws')
const recPath = `/mnt/blockstorage1/record`

// function init() {
//   console.log('ws启动');
//   return buildWs(io)
// }
// init()

var record_free = async (ctx, next) => {
  let body = ctx.request.body;
  let re = null
  body.name_list && body.target && free.receive_param(body.name_list, body.target)
  try {
    re = free.upload()
  } catch (error) {
    console.error(error);
  }

  if (re) {
    ctx.response.body = {
      data: '',
      code: 200,
      msg: '请求发送成功'
    };
  } else {
    ctx.response.body = {
      data: null,
      code: 200,
      msg: '出错'
    };
  }

};

let record_release = async (ctx, next) => {
  try {
    // let re = release.init()
    child_process.exec(`cd /root/pm_s/record/auto-encode && node auto_release.js`)
  } catch (e) {
    console.error(error);
  }
  ctx.response.body = {
    data: [],
    code: 200,
    
    msg: '请求发送成功'
  };

};

let record_release_mp4 = async (ctx, next) => {
  try {
    let re = reMp4.init()
  } catch (error) {
    console.error(error);
  }
  ctx.response.body = {
    data: [],
    code: 200,
    msg: '请求发送成功'
  };;

};

let show_record = async (ctx, next) => {
  // let re = 
  // let readDir = await fs.readdirSync(addr);
  let res = await child_process.execSync(`cd ${recPath} && ls -t`, {
    encoding: 'UTF-8'
  })
  ctx.response.body = {
    data: res,
    code: 200,
    msg: '请求发送成功'
  };

};

let record_size_list = async (ctx, next) => {
  // let re = 
  // let res = await child_process.execSync(`cd /root/pm_s/record && du -sh *`, {
  //   encoding: 'UTF-8'
  // })

  let res = await child_process.execSync(`cd ${recPath} && du -sh .[!.]* * | sort -hr`, {
    encoding: 'UTF-8'
  })
  console.log(res);
  ctx.response.body = {
    data: res,
    code: 200,
    msg: '请求发送成功'
  };;

};

let left_storage = async (ctx, next) => {
  // let re = 
  let res = await child_process.execSync(`df -hl`, {
    encoding: 'UTF-8'
  })
  // let list = res.split(" ")
  // console.log(list);
  ctx.response.body = {
    data: res,
    code: 200,
    msg: '请求发送成功'
  };;

};

let to_mp4 = async (ctx, next) => {
  // let re = 
  let body = ctx.request.body;
  free.receive_param(body.name_list, null)
  let re = free.to_mp4()
  // let list = res.split(" ")
  // console.log(list);
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '请求发送成功'
  };

};

let rmFile = async (ctx, next) => {
  // let re = 
  let body = ctx.request.body;
  if (!body.fileName) {
    ctx.response.body = '文件名为空';
    return
  }
  let nameList = body.fileName.split(',')
  let res = ''
  nameList.forEach(e => {
    console.log(`cd ${recPath} && rm -rf '${e}'`);
    res = child_process.execSync(`cd ${recPath} && rm -rf "${e}"`, {
      encoding: 'UTF-8'
    })
  })

  // let list = res.split(" ")
  console.log(res);
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '请求发送成功'
  };

};

// let start_time_count = async (ctx, next) => {
//   if (!timer) {
//     timer = new Timer(28800000)
//   }
//   timer.count()
//   ctx.response.body = '计时已开始';
// };

// let reset_time_count = async (ctx, next) => {
//   let res = ''
//   if (timer) {
//     timer.reset()
//     res = '已重置计时'
//   } else {
//     res = '计时器不存在'
//   }
//   ctx.response.body = res;
// };

// let stop_time_count = async (ctx, next) => {
//   let res = ''
//   if (timer) {
//     timer.stop()
//     res = '已停止计时'
//   } else {
//     res = '计时器不存在'
//   }
//   ctx.response.body = res;
// };

// let get_left_time = async (ctx, next) => {
//   let res = ''
//   if (timer) {
//     res = timer.total_time
//   } else {
//     res = 0
//   }
//   ctx.response.body = res;
// };

let deploy = async (ctx, next) => {
  const files = ctx.request.files.files
  // console.log(files) 
  files && deployUp(files)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '请求发送成功'
  };
};

let deploysun = async (ctx, next) => {
  const files = ctx.request.files.files
  // console.log(files) 
  files && deploySun(files)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '请求发送成功'
  };
};

let memPercent = async (ctx, next) => {
  let res = child_process.execSync(`free -h`, {
    encoding: 'UTF-8'
  })
  let list = res.split('\n')[1].split(`       `)
  const getNum = (str)=>{
    return str.slice(0,-2)*1
  }
  let ret = [getNum(list[2]),getNum(list[3])+getNum(list[5])]
  ctx.response.body = {
    data: ret,
    code: 200,
    msg: '请求发送成功'
  };
};

const uploadTemp =  async (ctx, next) => {
  const files = ctx.request.files.files
  // console.log(files) 
  files && upTemp(files)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '请求发送成功'
  };
};

const uploadBook =  (ctx, next) => {
  const files = ctx.request.files.files
  files && upBook(files)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '书籍上传成功'
  };
};

const uploadElectron =  (ctx, next) => {
  const files = ctx.request.files.files
  files && upElectron(files)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'Electron上传成功'
  };
};


const rollBackVue =  async (ctx, next) => {
  child_process.exec(`cd /home/learn/koa/newup && cp -rf ./backup/dist.zip ./ && unzip -o ./dist.zip -d ./`)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '请求发送成功'
  };
};

const rollBackSun =  async (ctx, next) => {
  child_process.exec(`cd /home/learn/koa/sun && cp -rf ./backup/dist.zip ./ && unzip -o ./dist.zip -d ./`)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '请求发送成功'
  };
};




module.exports = {
  'POST /mv_upload/record_free': record_free,
  'GET /mv_upload/record_release': record_release,
  'GET /mv_upload/free/record_release': record_release,
  'GET /mv_upload/record_release_mp4': record_release_mp4,
  'POST /mv_upload/to_mp4': to_mp4,
  'POST /mv_upload/rmFile': rmFile,
  'POST /mv_upload/deploy': deploy,
  'POST /mv_upload/deploysun': deploysun,
  'POST /mv_upload/uploadTemp': uploadTemp,
  'POST /mv_upload/uploadBook': uploadBook,
  'POST /mv_upload/free/uploadElectron': uploadElectron,
  'GET /mv_upload/show_record': show_record,
  'GET /mv_upload/record_size_list': record_size_list,
  'GET /mv_upload/left_storage': left_storage,
  'GET /mv_upload/memPercent': memPercent,
  'GET /mv_upload/rollBackVue': rollBackVue,
  'GET /mv_upload/rollBackSun': rollBackSun,
  // 'GET /timer/start_time_count': start_time_count,
  // 'GET /timer/reset_time_count': reset_time_count,
  // 'GET /timer/stop_time_count': stop_time_count,
  // 'GET /timer/get_left_time': get_left_time
};

