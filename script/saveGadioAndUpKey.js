/*
 * @Author: your name
 * @Date: 2023-08-10 00:43:03
 * @LastEditTime: 2023-08-30 01:37:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/script/saveGadioAndUpKey.js
 */
const fs = require('fs')
const process = require('process')
const child_process = require('child_process')
const [url] = process.argv.slice(2)
const bent = require('bent')
const { getFilesSortedByCreateDate } = require('../util/util')
const post = bent('POST', 'json');
// ffmpeg -i "f13711fe-795f-44cb-b4c5-073fed637f23.mp3" -filter_complex "asetrate=48000*2^(2/12),atempo=1/2^(2/12)" "output.mp3"
const root = `/mnt/blockstorage1/record`
// post('https://meamoe.one/koa/newCen/free/saveGadioOver')
const checkIsExist = (fileName)=>{
  let fileNameList = fs.readdirSync(root)
  return  fileNameList.some(e=>{
    return e==`output-${fileName}`
  })
}
const delOutDate = ()=>{//保留最新的五个
  let fileList = getFilesSortedByCreateDate(root)
  let idx = fileList.length > 5 ? fileList.length - 5:0
  let NotLastFive = fileList.slice(-idx)  
  if(idx != 0 && NotLastFive.length == 0 ){
    return
  }
  let str = NotLastFive.reduce((a, b) => {
    return `"${a.file}"` + ` "${b.file}"`
  })
  child_process.spawnSync(`cd ${root} && rm ${str}`, { detached: true, shell: true, stdio: 'ignore' })
}
const wget = ()=>{
  let fileName = url.split('/').pop()
  if(checkIsExist(fileName)){
    post('https://meamoe.one/koa/newCen/free/saveGadioOver')
    return
  }
  delOutDate()
  child_process.spawnSync(`cd ${root} && wget --content-disposition '${url}'`, { detached: true, shell: true, stdio: 'ignore' })
  let fileNameList = fs.readdirSync(root)
  fileNameList.forEach(e=>{
    if(e==fileName){
      // child_process.spawnSync(`cd ${root} && ffmpeg -i "${fileName}" -filter_complex "asetrate=48000*2^(4/12),atempo=1/2^(4/12)" "output-${fileName}" && rm "${fileName}"`, { detached: true, shell: true, stdio: 'ignore' })
      // child_process.spawnSync(`cd ${root} && ffmpeg -i "${fileName}" -filter_complex "asetrate=48000*2^(4/12),atempo=1/2^(4/12)" "output-${fileName}"`, { detached: true, shell: true, stdio: 'ignore' })

      // child_process.spawnSync(`cd ${root} && ffmpeg -i "${fileName}" -af "rubberband=pitch=1.5,volume=1.5" "output-${fileName}" && rm "${fileName}"`, { detached: true, shell: true, stdio: 'ignore' })

      child_process.spawnSync(`cd ${root} && ffmpeg -i "${fileName}" -af "volume=1.5" "output-${fileName}" && rm "${fileName}"`, { detached: true, shell: true, stdio: 'ignore' })
    }
  })
  post('https://meamoe.one/koa/newCen/free/saveGadioOver')
}

wget()
// delOutDate()

