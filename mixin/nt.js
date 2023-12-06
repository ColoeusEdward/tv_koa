/*
 * @Author: your name
 * @Date: 2022-05-13 06:22:30
 * @LastEditTime: 2022-06-30 07:59:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/mixin/nt.js
 */
const fs = require('fs')
const bent = require('bent')
const jsonwebtoken = require('jsonwebtoken')
const formurlencoded = require('form-urlencoded')
const {
  secret
} = require('../util/util')
const miUtil = require('/root/pm_s/record/auto-encode/genshin/miyoshe.js')

let tbsStr = `Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: BDUSS=2NXWVFwNkw0ZC1wRVpBak1iVkZmYjh5cHlVZWk3OU5TMmZYREJVWWVxYW1nNTFoSVFBQUFBJCQAAAAAAAAAAAEAAABEsc1NSm9rZXK8rwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKb2dWGm9nVha;
DNT: 1
Origin: https://tieba.baidu.com
Referer: https://tieba.baidu.com
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36
X-Requested-With: XMLHttpRequest`
let tbsHeader = miUtil.builderHeader(tbsStr)

const getTbsFn = async ()=>{
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'json', tbsHeader)
  try {
    res = await gv(`/dc/common/tbs`)
  } catch (e) {
    // msg = 'v8 Forbidden'
  }
  return res
}

const getImgTbsFn = async ()=>{
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'json', tbsHeader)
  try {
    res = await gv(`/dc/common/imgtbs`)
  } catch (e) {
    // msg = 'v8 Forbidden'
  }
  return res
}

const writeTbs = async (name='tbs',getFn=getTbsFn)=>{
  let res = await getFn()
  if(res.length){
    writeTbs()
    return 
  }
  let d = JSON.stringify(res)
  fs.writeFile(`/home/learn/koa/lexue/static/${name}.json`, d, (e) => {})
  tbs=res.tbs
}

const readTbs = (name='tbs',readFn=(obj)=>obj.tbs)=>{
  try{
    let str = fs.readFileSync(`/home/learn/koa/lexue/static/${name}.json`)
    return readFn(JSON.parse(str))
  }catch(e){
    return  console.error(e)
  }
  
}

let tbs = readTbs()
let imgTbs = readTbs('imgTbs',(obj)=>obj.data.tbs)

module.exports = {
  getTbsFn
  ,writeTbs
  , tbs
  , readTbs
  , getImgTbsFn
  , imgTbs
}