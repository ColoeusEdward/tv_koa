/*
 * @Author: your name
 * @Date: 2021-10-20 02:01:56
 * @LastEditTime: 2021-10-20 03:17:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/script/getOnedriveDan.js
 */
const bent = require('bent')
const fs = require('fs')
const child_process = require('child_process')
const process = require('process')
// console.log(url)

class GetOnedriveDan{
  constructor(){
    this.headerStr = `accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
    accept-encoding: gzip, deflate, br
    accept-language: zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7
    cookie: key=%24argon2i%24v%3D19%24m%3D4096%2Ct%3D3%2Cp%3D1%24eqgXhc%2F6tOM%2BGQ5sEwgIRw%24PPuJ58q4pXUdE0L9mhivD6dPF2DZIz5IfEeLrmQMfn0
    dnt: 1
    if-none-match: W/"{8E905849-AF73-4EE5-8D44-30731C99E9C7},1"
    referer: https://meamoe.ml/mydrive/
    sec-ch-ua: "Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"
    sec-ch-ua-mobile: ?0
    sec-ch-ua-platform: "Windows"
    sec-fetch-dest: document
    sec-fetch-mode: navigate
    sec-fetch-site: same-origin
    upgrade-insecure-requests: 1
    user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36`
    
    this.header = this.builderHeader(this.headerStr)
    // url && this.init()
  }

  async init(url){
    this.url = url
    let res  = await bent('GET', this.url, 'buffer', this.header)()
    console.log(res)
    child_process.execSync(`rm /root/pm_s/record/dan/curDan/*`)
    fs.writeFile('/root/pm_s/record/dan/curDan/dan.xml',res,err=>{
      console.log(err)
    })
  }

  builderHeader(headerStr){
    let list = headerStr.split('\n')
    // console.log(list);
    let header = {}
    list.forEach(e=>{
      let idx = e.search(':')
      let item = [e.slice(0,idx),e.slice(idx+1)]
      if(item[0].length>0){
        header[item[0].trim()] = item[1].trim()
      }
    })
    // console.log(header);
    return header
  }
}

let g = new GetOnedriveDan()

module.exports = g

let testUrl = `https://meamoe.ml/personal/wateryurban_e5site_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=64896f57-a339-4a54-aec7-ecfedeee3966&Translate=false&tempauth=eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZTVzaXRlLW15LnNoYXJlcG9pbnQuY29tQDBkOWMwYzVhLTRiNTctNDFiMy05MTY3LWEwOWE1MTc5M2ViNSIsImlzcyI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCIsIm5iZiI6IjE2MzQ2OTYzMTEiLCJleHAiOiIxNjM0Njk5OTExIiwiZW5kcG9pbnR1cmwiOiJiTE9YbCsxRmxBNlVVa0VrUm9UQjhsQjlncnBWVXBNWlFEcVNEK1hZaVc0PSIsImVuZHBvaW50dXJsTGVuZ3RoIjoiMTY0IiwiaXNsb29wYmFjayI6IlRydWUiLCJjaWQiOiJaakl4WmpNMVpqZ3RZbUUzT0MwME4yVm1MVGc0TnpndE5qZGxaVFUwWWpFM01EazMiLCJ2ZXIiOiJoYXNoZWRwcm9vZnRva2VuIiwic2l0ZWlkIjoiTm1Kak5tUTROamd0WWpnNU9DMDBOemc1TFRsa056Y3RNRFl4TkRJMFlUazNZakF3IiwiYXBwX2Rpc3BsYXluYW1lIjoiT25lRHJpdmUgZm9yIEFQSSIsInNpZ25pbl9zdGF0ZSI6IltcImttc2lcIl0iLCJhcHBpZCI6Ijc4ZDRkYzM1LTdlNDYtNDJjNi05MDIzLTJkMzkzMTQ0MzNhNSIsInRpZCI6IjBkOWMwYzVhLTRiNTctNDFiMy05MTY3LWEwOWE1MTc5M2ViNSIsInVwbiI6IndhdGVyeXVyYmFuQGU1c2l0ZS5vbm1pY3Jvc29mdC5jb20iLCJwdWlkIjoiMTAwMzIwMDBDRDUzQjhENiIsImNhY2hla2V5IjoiMGguZnxtZW1iZXJzaGlwfDEwMDMyMDAwY2Q1M2I4ZDZAbGl2ZS5jb20iLCJzY3AiOiJhbGxmaWxlcy53cml0ZSBhbGxwcm9maWxlcy5yZWFkIiwidHQiOiIyIiwidXNlUGVyc2lzdGVudENvb2tpZSI6bnVsbCwiaXBhZGRyIjoiMjAuMTkwLjEzMi40MSJ9.OTRHN3FSb3JvZHRvYW1od3ZWaFVUNFJMemJYZ3IxcklSZlFZOGhnSFhPWT0&ApiVersion=2.0`