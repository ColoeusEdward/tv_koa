/*
 * @Author: your name
 * @Date: 2021-09-28 03:09:35
 * @LastEditTime: 2021-09-28 03:09:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/mixin/test.js
 */
const child_process = require('child_process')
const dir = '/home/learn/koa/newup'
child_process.execSync(`unzip -o ${dir}/dist.zip`)