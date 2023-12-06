/*
 * @Author: your name
 * @Date: 2022-01-05 03:28:39
 * @LastEditTime: 2022-01-18 02:17:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/mixin/newCen.js
 */
const fs = require('fs')
const process = require('process')
const {send_mail} = require('../util/util')
const child_process = require('child_process')
const [url,token] = process.argv.slice(2)
const {socketG} = require('../mixin/ws/ws')
console.log('url',url)
const newFn = (item)=>{
  let cp = child_process.spawn(`cd /home/learn/koa/lexue/script/yup && ./youtubeuploader_linux_amd64 -headlessAuth -filename ${item}`,{detached:true,shell:true})
  cp.stdout.setEncoding('utf8')
  cp.stdout.on("data", data=>{
    if(data.search('auth dialog')!=-1){
      let text = {
        title:'请手动执行'
        ,name:`cd /home/learn/koa/lexue/script/yup && ./youtubeuploader_linux_amd64 -headlessAuth -filename ${item}`
      }
      console.log('need token')
      send_mail(text,'1103874618@qq.com','token过期bot')
      socketG.emit('YoutubeNeedToken',data)
      process.kill(-cp.pid);
    }
    if(data.search('code here')!=-1 && token){
      cp.stdin.write(token+'\n');
      cp.stdin.end();
    }
    if(data.search('successful')!=-1){
      console.log('upload done')
      child_process.exec(`cd /home/learn/koa/lexue/script/yup && rm ${item}`)
    }else{
      console.log(data)
    }
  })
}
const downAndUpVideo = () => {
  child_process.spawnSync(`cd /home/learn/koa/lexue/script/yup && wget --content-disposition '${url}'`,{detached:true,shell:true,stdio:'ignore'})
  let item = null
  let readDir = fs.readdirSync('/home/learn/koa/lexue/script/yup');
  readDir.forEach(function (e) {
    if(e.search('.flv') != -1){
      let name = e.search.split('.flv')[0]
      child_process.spawnSync(`cd /home/learn/koa/lexue/script/yup && ffmpeg -i '${e}' -vcodec copy -acodec copy '${name}.mp4'`,{detached:true,shell:true,stdio:'ignore'})
      child_process.exec(`cd /home/learn/koa/lexue/script/yup && rm '${e}''`)
    }
    if (e.search('.mp4') != -1) {
        item = e
    }
  })
  console.log('start upload '+ item)
  newFn(item)
  // let res = child_process.spawnSync(`cd /home/learn/koa/lexue/script/yup && ./youtubeuploader_linux_amd64 -headlessAuth -filename ${item}`,{detached:true,shell:true})
  // if(res.stdout.toString().search('successful!')>-1){
  //   console.log('upload done')
  //   child_process.exec(`cd /home/learn/koa/lexue/script/yup && rm ${item}`)
  // }else{
  //   console.log('upload failed')
  //   console.log(res.stdout.toString())
  //   console.log(res.stderr.toString())
  // }
}

downAndUpVideo()

// module.exports = {
//   downAndUpVideo
// }

