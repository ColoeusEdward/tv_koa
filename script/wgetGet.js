/*
 * @Author: your name
 * @Date: 2023-06-30 07:29:57
 * @LastEditTime: 2023-08-04 03:21:57
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /lexue/script/wgetGet.js
 */
const process = require('process')
const child_process = require('child_process')
const [url] = process.argv.slice(2)

const root = `/mnt/blockstorage1/record`
const wget = ()=>{
  child_process.spawnSync(`cd ${root} && wget --content-disposition '${url}'`, { detached: true, shell: true, stdio: 'ignore' })
}
wget()