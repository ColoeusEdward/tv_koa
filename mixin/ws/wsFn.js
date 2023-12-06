/*
 * @Author: your name
 * @Date: 2021-10-14 01:52:22
 * @LastEditTime: 2022-01-13 07:50:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/mixin/ws/wsFn.js
 */
const fs = require('fs')
const child_process = require('child_process')

const getMem = async () => {
  let res = child_process.execSync(`free -h`, {
    encoding: 'UTF-8'
  })
  let list =  res.split('\n')[1].split(`       `)
  const getNum = (str) => {
    return str.slice(0, -2) * 1
  }
  let ret = [getNum(list[2]), getNum(list[3]) + getNum(list[5])]
  return ret
}

const syncVideoToYou = (url, next) => {
  console.log(`${url}`)
  // const test = async () => {
  //     let res = await child_process.spawn(`cd /home/learn/koa/lexue/script && node downAnUpVideo.js '${url}'`,{detached:true,shell:true})
  //     console.log(res.stdout)
  //     console.log(res.stderr)
  // }
  // test()
  // stdio:['ipc','ipc','pipe']
  child_process.spawn(`cd /home/learn/koa/lexue/script && node downAnUpVideo.js '${url}'`,{detached:true,shell:true,stdio:['pipe','ignore','ignore','ipc']})
}

const testIpc = (ctx, next) => {
  
  // cp.setEncoding('utf8')
  // cp.stdout.on("data", data=>{
  //   console.log('ipcData',data)
  // })
  // cp.stdout.on("message", msg=>{
  //   console.log('ipcMessage',msg)
  // })
  let cp = child_process.spawn(`cd /home/learn/koa/lexue/script && node test.js`,{detached:true,shell:true,stdio:['pipe','inherit','ignore','ipc']})
  cp.on('message', (m) => {
    console.log('msg',m)
    cp.stdin.write('66'+'\n');
    cp.stdin.end();
  });
  
  
  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'testIpc已发送'
  };
} 

module.exports = {
  getMem
  ,syncVideoToYou
  ,testIpc
}