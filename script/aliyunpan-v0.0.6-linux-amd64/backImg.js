/*
 * @Author: your name
 * @Date: 2022-06-06 09:05:20
 * @LastEditTime: 2023-06-13 06:11:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/script/aliyunpan-v0.0.6-linux-amd64/backImg.js
 */
const fs = require('fs')
const process = require('process')
// const {send_mail} = require('../util/util')
const child_process = require('child_process')
const [url] = process.argv.slice(2)
const root = `/home/learn/koa/lexue/script/aliyunpan-v0.0.6-linux-amd64`

const validString = (str) => {  //字符串合法化
  let res = true
  if (str.slice(0, 1) == '-') {
    str = str.slice(1)
    res = false
  }
  return [str, res]
}

const backImg = () => {
  let referer = url.search('pximg') != -1 ? '--referer https://www.pixiv.net/ ' : ''
  child_process.spawnSync(`cd ${root} && wget ${referer} --content-disposition '${url}'`, { detached: true, shell: true, stdio: 'ignore' })
  let item = null
  let readDir = fs.readdirSync(root);
  readDir.forEach(function (e) {
    let reg = /\.(jpg|png|jpeg|gif)/
    let reg2 = /format=(jpg)/
    if (e.match(reg)) {
      // let [newE,res] = validString(e)
      // if(!res){
      //   fs.renameSync(`${root}/${e}`,`${root}/${newE}`)
      // }
      child_process.spawnSync(`cd ${root} && ./aliyunpan u ./'${e}' /acg/pic`, { detached: true, shell: true, stdio: 'ignore' })
      child_process.exec(`cd ${root} && rm ./'${e}'`)
    } else if (e.match(reg2)) {
      fs.renameSync(`${root}/${e}`, `${root}/${e}.jpg`)
      child_process.spawnSync(`cd ${root} && ./aliyunpan u ./'${e}.jpg' /acg/pic`, { detached: true, shell: true, stdio: 'ignore' })
      child_process.exec(`cd ${root} && rm ./'${e}.jpg'`)
    }
  })
}

const backImgOneDrive = () => {
  if (url) {
    let referer = url.search('pximg') != -1 ? '--referer https://www.pixiv.net/ ' : ''
    child_process.spawnSync(`cd ${root} && wget ${referer} --content-disposition '${url}'`, { detached: true, shell: true, stdio: 'ignore' })
  }
  let item = null
  let readDir = fs.readdirSync(root);
  readDir.forEach(function (e) {
    let reg = /\.(jpg|png|jpeg|gif|webp)/
    let reglast = /\.(jpg|png|jpeg|gif|webp)$/
    let reg2 = /format=(jpg|png)/

    let matRes = e.match(reg)
    let matRes2 = {}
    const checkReg2 = () => {
      matRes2 = reg2.exec(e)
      return e.match(reg2)
    }

    if (matRes) {
      // let [newE,res] = validString(e)
      // if(!res){
      //   fs.renameSync(`${root}/${e}`,`${root}/${newE}`)
      // }
      // child_process.spawnSync(`cd ${root} && ./aliyunpan u ./'${e}' /ac/pic`, { detached: true, shell: true, stdio: 'ignore' })
      if (!e.match(reglast)) {
        fs.renameSync(`${root}/${e}`, `${root}/${e}${matRes[0]}`)
        e = `${e}${matRes[0]}`
      }
      child_process.spawnSync(`cd ${root} && OneDriveUploader -c /root/pm_s/auth.json -s ./'${e}' -r "/ac/pic" -f`, { detached: true, shell: true, stdio: 'ignore' })
      child_process.exec(`cd ${root} && rm ./'${e}'`)
    } else if (checkReg2()) {
      let ftype = matRes2[1]
      fs.renameSync(`${root}/${e}`, `${root}/${e}.${ftype}`)
      child_process.spawnSync(`cd ${root} && OneDriveUploader -c /root/pm_s/auth.json -s ./'${e}.${ftype}' -r "/ac/pic" -f`, { detached: true, shell: true, stdio: 'ignore' })
      child_process.exec(`cd ${root} && rm ./'${e}.${ftype}'`)
    }
  })
}

// backImg()
backImgOneDrive()