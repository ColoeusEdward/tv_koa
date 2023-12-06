/*
 * @Author: your name
 * @Date: 2021-12-13 01:47:24
 * @LastEditTime: 2022-04-01 01:52:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/script/test.js
 */
const fs = require('fs')
const child_process = require('child_process')

const test = async () => {
  let res = await child_process.spawnSync('ls -a', { detached: true, shell: true })
  console.log(res.stdout.toString().search('mp4'))
}

// test()

const tt = async () => {
  let cp = child_process.spawn('cd /home/learn/koa/lexue/script && ./test.sh', { detached: true, shell: true, stdio: ['inherit'] })
  cp.stdout.setEncoding('utf8')
  cp.stdout.on("data", data => {
    console.log('data', data)
    if (data.search('test') != -1) {
      process.send && process.send({ sb: 'ff' })
    }
  })
  // process.on('message', function(m){
  //   console.log('message from parent: ' + m);
  // });
  cp.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

tt()