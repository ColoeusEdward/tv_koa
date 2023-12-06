/*
 * @Author: your name
 * @Date: 2021-10-14 08:43:56
 * @LastEditTime: 2023-08-16 01:26:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/controller/newCentury.js
 */
const fs = require('fs')
const child_process = require('child_process')
const bent = require('bent')
const jsonwebtoken = require('jsonwebtoken')
const formurlencoded = require('form-urlencoded')
var FormData = require('form-data');
const axios = require('axios');

const {
  secret, sleep
} = require('../util/util')
const miUtil = require('/root/pm_s/record/auto-encode/genshin/miyoshe.js')
const { getTbsFn, writeTbs, tbs, getImgTbsFn, imgTbs } = require('../mixin/nt')
const { Level } = require('level')



const db = new Level('/home/learn/koa/lexue/ace', { valueEncoding: 'json' })

const tbHeaderStr = `Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cache-Control: max-age=0
Connection: keep-alive
Cookie: BIDUPSID=FB6DEB3F5667661AFCD77B96D82B7100; PSTM=1617607598; wise_device=0; st_key_id=17; video_bubble0=1; BAIDUID=FB6DEB3F5667661AFCD77B96D82B7100:SL=0:NR=10:FG=1; __yjs_duid=1_d546f997de11046ef6ed504ea7f7ac8f1620352220551; 1305325892_FRSVideoUploadTip=1; video_bubble1305325892=1; rpln_guide=1; USER_JUMP=-1; st_data=7170ae1b101c697916c47c5bb92d52ef35eb60299758dd9b7260e9a92d422648573703733f94f3e5b636ba12791005508fca431ef82d936415de8dd461db70b198241aa49e7ba1af3fca271b3b8b8558faeface92a1dd676190f493403128f635611d34494a64d56594a15183591874a5177be88d75eac74770188df4f3f4c4e; st_sign=693b0ae1; BDUSS=2NXWVFwNkw0ZC1wRVpBak1iVkZmYjh5cHlVZWk3OU5TMmZYREJVWWVxYW1nNTFoSVFBQUFBJCQAAAAAAAAAAAEAAABEsc1NSm9rZXK8rwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKb2dWGm9nVha; BDUSS_BFESS=2NXWVFwNkw0ZC1wRVpBak1iVkZmYjh5cHlVZWk3OU5TMmZYREJVWWVxYW1nNTFoSVFBQUFBJCQAAAAAAAAAAAEAAABEsc1NSm9rZXK8rwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKb2dWGm9nVha; delPer=0; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; H_WISE_SIDS=110085_127969_179349_184716_185636_189755_194085_194512_195343_196425_196528_197242_197711_197957_198269_199176_199576_200993_201193_201535_201599_201701_202545_203309_203504_203520_203641_204031_204255_204305_204535_204701_204728_204778_204864_204905_205218_205235_205390_205484_205569_206008_206250_206277_206516_206682_206705_206728_206804_206870_206906_207022_207122_207234_207363_207471_207591_207616_207729_207830_207863_207893_208064_208112_208164_208216_208223_208226_208255_208267_208270_208312_208363_208366_208486_208559_208721_208764_208770_208776_208805_209250; BAIDU_WISE_UID=wapp_1648862969305_71; tb_as_data=c6794f404f155d65cc2de2db7f6ea2e40574f7af0aceae4186b6aac3098d7299a16b8bfef7c8597fd14e297bc8bbdd52808c61830f65c7fab9d19e1aa23f8ecf550b95fcec8e40899da5d20e7281d39f3f86a89cca540318d7f14eaf212d293852f5a369ddc02ef19ef4467bb394ffd4; BAIDUID_BFESS=BBA13646C2F8B0DAD9F92A2DFB7F068C:FG=1; ZD_ENTRY=bing; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; BDRCVFR[tox4WRQ4-Km]=mk3SLVN4HKm; BDRCVFR[CLK3Lyfkr9D]=mk3SLVN4HKm; H_PS_PSSID=36429_36185_31660_36421_36167_34584_35978_36055_36281_35802_36344_26350_22158; PSINO=6; STOKEN=03e678b1b4b6a5e4aa88c5c58cb76f692f3fcdb5d9d722cc04b50a633572c187; Hm_lvt_98b9d8c2fd6608d564bf2ac2ae642948=1652432952; RT="z=1&dm=baidu.com&si=inkm5ieojvi&ss=l38eayvo&sl=2&tt=1eo&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ld=1yr&ul=2vy&hd=2w8"; Hm_lpvt_98b9d8c2fd6608d564bf2ac2ae642948=1652697027
DNT: 1
Host: tieba.baidu.com
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: cross-site
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36`
const header = miUtil.builderHeader(tbHeaderStr)
let mstr = `DNT: 1
sec-ch-ua-mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36
sec-ch-ua-platform: "Windows"
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: BIDUPSID=FB6DEB3F5667661AFCD77B96D82B7100; PSTM=1617607598; wise_device=0; st_key_id=17; video_bubble0=1; BAIDUID=FB6DEB3F5667661AFCD77B96D82B7100:SL=0:NR=10:FG=1; __yjs_duid=1_d546f997de11046ef6ed504ea7f7ac8f1620352220551; 1305325892_FRSVideoUploadTip=1; video_bubble1305325892=1; rpln_guide=1; USER_JUMP=-1; st_data=7170ae1b101c697916c47c5bb92d52ef35eb60299758dd9b7260e9a92d422648573703733f94f3e5b636ba12791005508fca431ef82d936415de8dd461db70b198241aa49e7ba1af3fca271b3b8b8558faeface92a1dd676190f493403128f635611d34494a64d56594a15183591874a5177be88d75eac74770188df4f3f4c4e; st_sign=693b0ae1; BDUSS=2NXWVFwNkw0ZC1wRVpBak1iVkZmYjh5cHlVZWk3OU5TMmZYREJVWWVxYW1nNTFoSVFBQUFBJCQAAAAAAAAAAAEAAABEsc1NSm9rZXK8rwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKb2dWGm9nVha; BDUSS_BFESS=2NXWVFwNkw0ZC1wRVpBak1iVkZmYjh5cHlVZWk3OU5TMmZYREJVWWVxYW1nNTFoSVFBQUFBJCQAAAAAAAAAAAEAAABEsc1NSm9rZXK8rwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKb2dWGm9nVha; delPer=0; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; H_WISE_SIDS=110085_127969_179349_184716_185636_189755_194085_194512_195343_196425_196528_197242_197711_197957_198269_199176_199576_200993_201193_201535_201599_201701_202545_203309_203504_203520_203641_204031_204255_204305_204535_204701_204728_204778_204864_204905_205218_205235_205390_205484_205569_206008_206250_206277_206516_206682_206705_206728_206804_206870_206906_207022_207122_207234_207363_207471_207591_207616_207729_207830_207863_207893_208064_208112_208164_208216_208223_208226_208255_208267_208270_208312_208363_208366_208486_208559_208721_208764_208770_208776_208805_209250; BAIDU_WISE_UID=wapp_1648862969305_71; tb_as_data=c6794f404f155d65cc2de2db7f6ea2e40574f7af0aceae4186b6aac3098d7299a16b8bfef7c8597fd14e297bc8bbdd52808c61830f65c7fab9d19e1aa23f8ecf550b95fcec8e40899da5d20e7281d39f3f86a89cca540318d7f14eaf212d293852f5a369ddc02ef19ef4467bb394ffd4; BAIDUID_BFESS=BBA13646C2F8B0DAD9F92A2DFB7F068C:FG=1; ZD_ENTRY=bing; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; BDRCVFR[tox4WRQ4-Km]=mk3SLVN4HKm; BDRCVFR[CLK3Lyfkr9D]=mk3SLVN4HKm; H_PS_PSSID=36429_36185_31660_36421_36167_34584_35978_36055_36281_35802_36344_26350_22158; PSINO=6; STOKEN=03e678b1b4b6a5e4aa88c5c58cb76f692f3fcdb5d9d722cc04b50a633572c187; Hm_lvt_98b9d8c2fd6608d564bf2ac2ae642948=1652432952; RT="z=1&dm=baidu.com&si=tyj5yg369y&ss=l39snjzr&sl=0&tt=0&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ul=1k5&hd=1lc"; Hm_lpvt_98b9d8c2fd6608d564bf2ac2ae642948=1652840464
Sec-Fetch-Site: none
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty`
let mheader = miUtil.builderHeader(mstr)

let postStr = `Accept: application/json, text/javascript, */*; q=0.01
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: BIDUPSID=FB6DEB3F5667661AFCD77B96D82B7100; PSTM=1617607598; wise_device=0; st_key_id=17; video_bubble0=1; BAIDUID=FB6DEB3F5667661AFCD77B96D82B7100:SL=0:NR=10:FG=1; __yjs_duid=1_d546f997de11046ef6ed504ea7f7ac8f1620352220551; 1305325892_FRSVideoUploadTip=1; video_bubble1305325892=1; rpln_guide=1; USER_JUMP=-1; st_data=7170ae1b101c697916c47c5bb92d52ef35eb60299758dd9b7260e9a92d422648573703733f94f3e5b636ba12791005508fca431ef82d936415de8dd461db70b198241aa49e7ba1af3fca271b3b8b8558faeface92a1dd676190f493403128f635611d34494a64d56594a15183591874a5177be88d75eac74770188df4f3f4c4e; st_sign=693b0ae1; BDUSS=2NXWVFwNkw0ZC1wRVpBak1iVkZmYjh5cHlVZWk3OU5TMmZYREJVWWVxYW1nNTFoSVFBQUFBJCQAAAAAAAAAAAEAAABEsc1NSm9rZXK8rwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKb2dWGm9nVha; BDUSS_BFESS=2NXWVFwNkw0ZC1wRVpBak1iVkZmYjh5cHlVZWk3OU5TMmZYREJVWWVxYW1nNTFoSVFBQUFBJCQAAAAAAAAAAAEAAABEsc1NSm9rZXK8rwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKb2dWGm9nVha; delPer=0; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; H_WISE_SIDS=110085_127969_179349_184716_185636_189755_194085_194512_195343_196425_196528_197242_197711_197957_198269_199176_199576_200993_201193_201535_201599_201701_202545_203309_203504_203520_203641_204031_204255_204305_204535_204701_204728_204778_204864_204905_205218_205235_205390_205484_205569_206008_206250_206277_206516_206682_206705_206728_206804_206870_206906_207022_207122_207234_207363_207471_207591_207616_207729_207830_207863_207893_208064_208112_208164_208216_208223_208226_208255_208267_208270_208312_208363_208366_208486_208559_208721_208764_208770_208776_208805_209250; BAIDU_WISE_UID=wapp_1648862969305_71; tb_as_data=c6794f404f155d65cc2de2db7f6ea2e40574f7af0aceae4186b6aac3098d7299a16b8bfef7c8597fd14e297bc8bbdd52808c61830f65c7fab9d19e1aa23f8ecf550b95fcec8e40899da5d20e7281d39f3f86a89cca540318d7f14eaf212d293852f5a369ddc02ef19ef4467bb394ffd4; BAIDUID_BFESS=BBA13646C2F8B0DAD9F92A2DFB7F068C:FG=1; ZD_ENTRY=bing; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; BDRCVFR[tox4WRQ4-Km]=mk3SLVN4HKm; BDRCVFR[CLK3Lyfkr9D]=mk3SLVN4HKm; H_PS_PSSID=36429_36185_31660_36421_36167_34584_35978_36055_36281_35802_36344_26350_22158; PSINO=6; STOKEN=03e678b1b4b6a5e4aa88c5c58cb76f692f3fcdb5d9d722cc04b50a633572c187; Hm_lvt_98b9d8c2fd6608d564bf2ac2ae642948=1652432952; RT="z=1&dm=baidu.com&si=tyj5yg369y&ss=l39snjzr&sl=0&tt=0&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ul=1k5&hd=1lc"; Hm_lpvt_98b9d8c2fd6608d564bf2ac2ae642948=1652870401
DNT: 1
Origin: https://tieba.baidu.com
Referer: https://tieba.baidu.com/p
sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36
X-Requested-With: XMLHttpRequest
Content-Type: application/x-www-form-urlencoded`
let pHeader = miUtil.builderHeader(postStr)
console.log('pHeader', pHeader)


const login = (ctx, next) => {
  let body = ctx.request.body
  let user = body
  console.log(user)
  let data = {}
  let msg = '登录失败'
  let code = 400
  if (user.name == 'kafka' && user.psw == '1103874618') {
    fs.writeFile('/home/learn/koa/lexue/static/user.json', JSON.stringify(user), () => { })
    data = {
      Bearer: user.name,
      token: jsonwebtoken.sign({
        name: user.name
      }, secret, {
        expiresIn: '30d'
      })
    }
    msg = '登录成功'
    code = 200
  }
  ctx.response.body = {
    data: data,
    code: code,
    msg: msg
  };
}

const updateEcc = (ctx, next) => {
  child_process.exec(`cd /home/learn/koa/lexue/script && node updateEccOne.js 1`)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '更新ecc证书中'
  };
}

const rebootLexue = (ctx, next) => {
  child_process.exec(`pm2 restart 8`)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '重启成功'
  };
}

const gitPullOnedriveInedx = (ctx, next) => {
  child_process.exec(`cd /home/onedrive && git pull originssh master`)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: '拉取成功'
  };
}

const getAccountList = (ctx, next) => {
  let data = fs.readFileSync('/home/learn/koa/lexue/static/account.json')
  ctx.response.body = {
    data: data.toString(),
    code: 200,
    msg: '获取账号数据成功'
  };
}

const saveAccountList = (ctx, next) => {
  // let oldData = fs.readFileSync('../static/account.json')
  let { acc, psw } = ctx.request.body
  let msg = '保存账号数据失败'
  if (acc || psw) {
    let data = JSON.parse(fs.readFileSync('/home/learn/koa/lexue/static/account.json'))
    data.push({ acc, psw })
    fs.writeFileSync('/home/learn/koa/lexue/static/account.json', JSON.stringify(data))
    msg = '保存账号数据成功'
  }
  ctx.response.body = {
    data: '',
    code: 200,
    msg
  };
}

const editAccountList = (ctx, next) => {
  // let oldData = fs.readFileSync('../static/account.json')
  let { acc, psw,i } = ctx.request.body
  let msg = '保存账号数据失败'
  if (acc || psw) {
    let data = JSON.parse(fs.readFileSync('/home/learn/koa/lexue/static/account.json'))
    data[i] = {acc,psw}
    fs.writeFileSync('/home/learn/koa/lexue/static/account.json', JSON.stringify(data))
    msg = '保存账号数据成功'
  }
  ctx.response.body = {
    data: '',
    code: 200,
    msg
  };
}

const deleteAccout = (ctx, next) => {
  let { acc, psw } = ctx.request.body
  let data = JSON.parse(fs.readFileSync('/home/learn/koa/lexue/static/account.json')).filter(e => {
    return e.acc != acc || e.psw != psw
  })
  fs.writeFileSync('/home/learn/koa/lexue/static/account.json', JSON.stringify(data))
  ctx.response.body = {
    data: data.toString(),
    code: 200,
    msg: '删除账号数据成功'
  };
}

const getAliRefreshToken = (ctx, next) => {
  let str = fs.readFileSync('/home/learn/koa/lexue/script/aliyunpan-v0.0.6-linux-amd64/aliyunpan_config.json').toString()
  let data = JSON.parse(str)
  ctx.response.body = {
    data: data.userList[0].refreshToken,
    code: 200,
    msg: '已返回token'
  };
}

const syncVideoToYou = (ctx, next) => {
  let { url, token } = ctx.request.body
  console.log(`${url}`)
  // const test = async () => {
  //     let res = await child_process.spawn(`cd /home/learn/koa/lexue/script && node downAnUpVideo.js '${url}'`,{detached:true,shell:true})
  //     console.log(res.stdout)
  //     console.log(res.stderr)
  // }
  // test()
  // stdio:['ipc','ipc','pipe']
  const cp = child_process.spawn(`cd /home/learn/koa/lexue/script && node downAnUpVideo.js '${url}' ${token}`, { detached: true, shell: true, stdio: ['ignore', 'inherit', 'ignore'] })
  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'ok'
  };
}

const testIpc = (ctx, next) => {

  // cp.setEncoding('utf8')
  // cp.stdout.on("data", data=>{
  //   console.log('ipcData',data)
  // })
  // cp.stdout.on("message", msg=>{
  //   console.log('ipcMessage',msg)
  // })
  let cp = child_process.spawn(`cd /home/learn/koa/lexue/script && node test.js`, { detached: true, shell: true, stdio: ['pipe', 'inherit', 'ignore', 'ipc'] })
  cp.on('message', (m) => {
    console.log('msg', m)
    cp.stdin.write('66' + '\n');
    cp.stdin.end();
  });


  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'testIpc已发送'
  };
}

const novalGet = (ctx, next) => {

  // cp.setEncoding('utf8')
  // cp.stdout.on("data", data=>{
  //   console.log('ipcData',data)
  // })
  // cp.stdout.on("message", msg=>{
  //   console.log('ipcMessage',msg)
  // })
  let cp = child_process.spawn(`cd /home/learn/koa/lexue/script && node test.js`, { detached: true, shell: true, stdio: ['pipe', 'inherit', 'ignore', 'ipc'] })
  cp.on('message', (m) => {
    console.log('msg', m)
    cp.stdin.write('66' + '\n');
    cp.stdin.end();
  });


  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'noval ok'
  };
}

const testExten = (ctx, next) => {

  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'fuck ext'
  };
}

const getExistBook = (ctx, next) => {
  let list = []
  let readDir = fs.readdirSync('/home/learn/koa/lexue/static');
  readDir.forEach(function (e) {
    if (e.search('.txt') != -1) {
      list.push(e)
    }
  })
  let curJSON = fs.readFileSync('/home/learn/koa/lexue/static/book.json')
  let curObj = JSON.parse(curJSON)
  ctx.response.body = {
    data: list,
    curBook:curObj.name,
    code: 200,
    msg: '获取book成功'
  };
}

const getAllVideoRever = async (ctx, next) => { //时间倒序获取up video https://api.bilibili.com/x/space/arc/search
  let { mid, p } = ctx.params
  let msg = 'videoList Get'
  let res = ''
  if (!mid) {
    msg = '请输入mid'
  } else {
    let gv = bent('GET', 'https://api.bilibili.com', 'json')
    res = await gv('/x/space/arc/search' + `?mid=${mid}&ps=30&tid=0&pn=${p || 1}&keyword=&order=pubdate&jsonp=jsonp`)
  }
  ctx.response.body = {
    data: res.data,
    code: 200,
    msg: msg
  };
}

const getV8 = async (ctx, next) => {
  let msg = 'v8 Get'
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'string')
  try {
    res = await gv('/f?ie=utf-8&kw=v')
  } catch (e) {
    msg = 'v8 Forbidden'
  }

  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const getTB = async (ctx, next) => {
  let { name } = ctx.query
  let msg = 'TB Get'
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'string')
  try {
    res = await gv(`/f?ie=utf-8&kw=${name}`)
  } catch (e) {
    msg = 'v8 Forbidden'
  }

  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const getV8Comment = async (ctx, next) => {
  let { tid, p } = ctx.params
  let msg = 'TBComment Get'
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'json')
  try {
    res = await gv(`/p/totalComment?&tid=${tid}&fid=97650&pn=${p}&see_lz=0`)
  } catch (e) {
    msg = 'v8 Forbidden'
  }
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const getTBComment = async (ctx, next) => {
  let { fid, tid, p } = ctx.query
  let msg = 'TBComment Get'
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'json', header)
  try {
    res = await gv(`/p/totalComment?&tid=${tid}&fid=${fid}&pn=${p}&see_lz=0`)
  } catch (e) {
    msg = 'v8 Forbidden'
  }
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const getPageTBComment = async (ctx, next) => {
  let { pid, tid, p } = ctx.query
  console.log({ pid, tid, p })
  let msg = 'TBComment Get'
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'string', mheader)
  try {
    res = await gv(`/p/comment?tid=${tid}&pid=${pid}&pn=${p}`)
    // console.log('res',res)
  } catch (e) {
    // console.log('e',e)
    msg = 'v8 Forbidden'
  }
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const getV8Post = async (ctx, next) => {
  let { tid, p } = ctx.params
  let str = tbHeaderStr

  let msg = 'v8Post Get'
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'string', header)
  try {
    res = await gv(`/p/${tid}?pn=${p}`)
  } catch (e) {
    msg = 'v8 Forbidden'
  }
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const getTBPost = async (ctx, next) => {
  let { tid, p } = ctx.query
  let msg = 'TBPost Get'
  let res = ''
  let gv = bent('GET', 'https://tieba.baidu.com', 'string', header)
  try {
    res = await gv(`/p/${tid}?pn=${p}`)
  } catch (e) {
    msg = 'v8 Forbidden'
  }
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const replyTB = async (ctx, next) => {
  let { tid, fid, content, fname } = ctx.request.body
  console.log('{ tid, fid, content, fname }', { tid, fid, content, fname })
  let msg = 'send TB Replay Success'
  let res = ''
  pHeader.Referer = pHeader.Referer + '/' + tid
  let gv = bent('POST', 'https://tieba.baidu.com', 'json', pHeader)
  console.log('tbs', tbs)
  let data = {
    ie: 'utf-8'
    , kw: fname
    , fid: fid
    , tid: tid
    , rich_text: 1
    , tbs: tbs
    , content: content
    , basilisk: 1
    , mouse_pwd: `108,106,108,118,104,108,105,109,83,107,118,106,118,107,118,106,118,107,118,106,118,107,118,106,118,107,118,106,83,98,108,108,111,83,107,99,104,106,118,107,106,98,106,` + new Date().getTime()
    , mouse_pwd_t: new Date().getTime()
    , mouse_pwd_isclick: 1
    , 'biz[po]': `tb.1.707b2513.P5YEWlGqpe56xYi3DkDitA`
    , nick_name: `🎃凑斗牙鸟🌌👻`
    , ua: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36`
    , ev: 'comment'
    , __type__: 'reply'
    , geetest_success: 0
    , enc_sign: `1644217226187_1652870408812_M7IXPY2IL63myAQmBpVtAVX+UDwNXS/WFR3dxUrMiKsnkMrqMWPVFQM8XA+36mesFejzMtcn/Gn/PVGkB88z5SA2FaSTCgg9tCq097+P0m923ggWfj8gpoDe1hlpEaFzB/Hmo/Dr4o33T8zk+8fdh6SOEAxDBPw5sbCdUHrjMubHQ/vXSV10I3VnhaJ9TvleSR8c6p3sPmj66rr1uwFINPywi+N24Z9NydPj/it9FKXvcshqAKpCfEb2HlIvixS5W3pb0TPUZwMZahaOvl6Ckg==`
    , enc_sign_code: 0
    , _BSK: `TBMSUBIOE1JdVgRORkcFQQsUYlpdAwYRFBNZAENYEAYDUlNUAVNVGxUCAxQPEwIADAMUE1YAQ1gQBQtWXEgWDFcVDUMDBgQEAwUFAhQTQgBDWBJ5XBkNCFgDSwIZUxEeYlpdVFtESxF5ZUFTABoDWEQzXQxSAwxDSQABGhNxRENUVGBUAylZQBxWV1MaUVIXHyh5Ynh/HxBYWlNUF3YEAVtbGkMnDEYNCVIYUgEHGwMdBA0GCR8BBkExUVJSEQ1LAVFTGQRVExoXWAESDhEKAw4dV1QcBgFaSFMFTlYFDk8CBBkCAQMWHxpVBhNbQAEWH0EWVRZYRlFCDVJCXFxdEEZSVlVYXElLEE8TOAoFQAsSUhcAXlJQbhNNFh8aXAUTW0AYBQZXVUgBVE0bH1IFAgEfCgEAGhQZBgVSVBwFAFtRTRhKVQMFVR0HBgYFGRgbCQIOBk1TAwYGSkhMBVFTDhtSBwQGGh8YBQABARsAWVIJHR9LVVcCVUgFBVIGHxkbAgMABRQDAQNYSxwcAlBWVhhQXQQPShMaF14GEg4TTENCVE1ARwcRWUQCVQ4XUhtBXQQXCRNERkZdHRVCUEAKFAJTXFQYQA0GFVkRQkdGVhwWUgwTDREHA1xHVk9GCQBAXhUBUwEaBAIDABgCDAEHHVBUAAQfUVRUBEBIFUBSEwwXfWZ8eBEUE0cAQ1gSEQQhQVYGFgZEElEDEwZyFgIGBAlQVQFVUVNQV1cGAANVBwYBVgIFBQcACAUWCgMSBiVAHBZWUkZeFFBUBgBTBAcEHxFdBRECE1VQEgtcXUAIOwV4FFRdUEEdFEUAEQoUVVldRFRNQF4GEVlEEEYXARsVFwAUDxFVRVpQTFhYX0EWX2dHEQ0KU0pNF0xDalhUR1pGURNbXlNUPEJNFh9BCVcWWERDRRZUGhdfAhIOEUJZGnIvQBwWUFJGXhQWFkJSTxNFBhEJEEBBTVQbEwpTEg4TBQUIRwdIFVZQEwwVVVJcR1YUE0ADQ1gSemYvKEYYQBAFFVkRBwMGAAMEBwwDBR1DFQQWCUFUSEMLClNYFB1FUF9VHFBcW0RaVA8WHFpSDgFIWA0HVkMKXlgZUEZDQFxVdFtUDAdeQEBPDA1HFgtFTk9dWVZSR1lbXVpQRR0MB15BUQIWSEQHFkRYDVBaV1JBHEdQSl5bXQMDQkcfEBAFQBcXVVYRHUJaXF9SVUEUQkNQFRdDGFAPCxdRBkhRRQJcU0YfX1VaVExZG0UOEhxbQwYKAUZOFFZFBl9CF04=`
  }
  try {
    res = await gv(`/f/commit/post/add`, formurlencoded(data))
  } catch (e) {
    msg = 'v8 Forbidden'
  }
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const replyComment = async (ctx, next) => {
  let { tid, fid, content, fname, quoteId, repostid, hasReplyName } = ctx.request.body //quoteId,层id repostid，楼中楼id
  !hasReplyName && (hasReplyName = false)
  console.log('{ tid, fid, content, fname }', { tid, fid, content, fname, quoteId, repostid, hasReplyName })
  let msg = 'send TB Comment Replay Success'
  let res = ''
  pHeader.Referer = pHeader.Referer + '/' + tid
  let gv = bent('POST', 'https://tieba.baidu.com', 'json', pHeader)
  let data = {
    ie: 'utf-8'
    , kw: fname
    , fid: fid
    , tid: tid
    , rich_text: 1
    , tbs: tbs
    , content: content
    , quote_id: quoteId
    , parse_reply_name_flag: hasReplyName ? 1 : 0
    , basilisk: 1
    , mouse_pwd: `108,106,108,118,104,108,105,109,83,107,118,106,118,107,118,106,118,107,118,106,118,107,118,106,118,107,118,106,83,98,108,108,111,83,107,99,104,106,118,107,106,98,106,` + new Date().getTime()
    , mouse_pwd_t: new Date().getTime()
    , mouse_pwd_isclick: 1
    , 'biz[po]': `tb.1.707b2513.P5YEWlGqpe56xYi3DkDitA`
    , nick_name: `🎃凑斗牙鸟🌌👻`
    , ua: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36`
    , ev: 'comment'
    // , __type__: 'reply'
    , geetest_success: 0
    , enc_sign: `1644217226187_1652870408812_M7IXPY2IL63myAQmBpVtAVX+UDwNXS/WFR3dxUrMiKsnkMrqMWPVFQM8XA+36mesFejzMtcn/Gn/PVGkB88z5SA2FaSTCgg9tCq097+P0m923ggWfj8gpoDe1hlpEaFzB/Hmo/Dr4o33T8zk+8fdh6SOEAxDBPw5sbCdUHrjMubHQ/vXSV10I3VnhaJ9TvleSR8c6p3sPmj66rr1uwFINPywi+N24Z9NydPj/it9FKXvcshqAKpCfEb2HlIvixS5W3pb0TPUZwMZahaOvl6Ckg==`
    , enc_sign_code: 0
    , _BSK: `QxJACRRYERYOJxFTARVWShQEBxcLdhUGAggIAAgOVFEAClxRVVJSVQ0IBwMHCg8HBAQAFQoCFQ9yQB8RTlEWWxFRGE5YWFFdTxtDUVxWFFRfW0MPVl1NSVoAXgQYVV5VVEZRWF4YU0VLRF9Vcw5WXlwLQBIfCV1KRVlHSxRbX1dRRFFfXlpXEB9eXAtBA1ITGElUREZdVlZcVlFCFENTSlkOX1FYF0dNQBVVTURFV1NKG0RbX1xaUUIURRZSR0wWGAJfDkdcVRpTQFlaVUccXF1eV0xeTkdcSUlbEVYPUUsdRlRAXVlEFhwSTwESAhQsZn91RxhDXlIWAxFCR0ddGxJBARICEn1XTAtfX1hKAU8DQRxuWFhRXU9EEHpkEAkAHggNQmRaV1MAWhMZAg0YFnRCSFtVY1VSc1lEFwNRBB0KUxRJeClgdH0aFV5RXFUUd1VbW18RFiFbQVYIUU4CUQUXARgBCw0GHgIEEGtRVllECxwGClIaUgVDGBtaBBcIGg8GGAEDGhwSVgdACRMLVQVWA1QFCB0UVAYaDRBSUVxLVRwaXVMRCRkRRhRWTRZdABQPEAkVHBZdBBoKEg8FWgIfDlYDVh9WBwEAFBkQVAUSDhBESkVVFBQMABEDRQZRAlYEDAAHGRBVBRIOEhgJBQELGlMLCxBJHFgFWRgKAAUcHhAOBgMcBAkBGRQeWwAAFVEEVRpNHAwAABkGCQAZGBgFAAEcDAZQGh8RUANWH1UEDRgaHQUBABwABAARHBgADlAfBwxcHU0bWQMNHQIBBxEVHBZRAxoKEF5XDkBWFUddUBFbFE1DQ1AeGkMCFgoQCQYFCg5VAwcJXRhDX1AWAxNMXR97eRIYElUJEgoYBFICBAlQBVAfQ0cLEwwVAwEFABgSXgoSChhCEEZWFUdEUxFbFm5YWAYAGhsSWQUSAhBWWVoRVh8bFgdDCUFAS0RTGRBPBRIOEn5tfHwaGkBHAhtfFgdGD1dNWFlbEkxYY0BCWVZXGBEWGRNoVwRACEUEFFpeUlBvGEoSGBJCCRIKGlAXXVBNDFsPExNVV1VZWBoRF0sUa15ZRFlOU0JQXF0AaUFOQxgbUgcXCBhDQkFVHBpRAhoMQgIDAVUYQ0RSFgMRUFReS1IcFkMBGgoQCQZaAx8bBAVDCUEFAQQFGRBIBBIOEFZZXENdGkBeAhtfFgNSEl1VWEVebVl7RgRaVxpN`
  }
  repostid && (data.repostid = repostid) && (data.new_vcode = 1)
  try {
    res = await gv(`/f/commit/post/add`, formurlencoded(data))
  } catch (e) {
    msg = 'v8 Forbidden'
  }
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const uploadTbImg = async (ctx, next) => {
  let { url, fid } = ctx.request.body
  let msg = 'send TB Img Success'
  let res = ''
  let gv = bent('POST', 'https://uploadphotos.baidu.com', 'json', pHeader)
  let data = {
    filetype: 'url',
    'urls[]': url
  }
  try {
    res = await gv(`/upload/pic?tbs=${imgTbs}&fid=${fid}&save_yun_album=1`, formurlencoded(data))
  } catch (e) {
    msg = 'v8 Forbidden'
  }
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const getTbs = async (ctx, next) => {
  let msg = 'Tbs Get'
  let res = await getTbsFn()
  ctx.response.body = {
    data: res,
    code: 200,
    msg: msg
  };
}

const updateTbs = (ctx, next) => {
  let msg = 'updated tbs'
  writeTbs()
  writeTbs('imgTbs', getImgTbsFn)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: msg
  };
}

const backupImg = (ctx, next) => {
  let { imgurl } = ctx.request.body
  const cp = child_process.spawn(`cd /home/learn/koa/lexue/script/aliyunpan-v0.0.6-linux-amd64 && node backImg.js '${imgurl}' `, { detached: true, shell: true, stdio: ['ignore', 'inherit', 'ignore'] })
  let msg = 'backup Img'
  ctx.response.body = {
    data: '',
    code: 200,
    msg: msg
  };
}

const getCurbook = (ctx, next) => {
  let { name } = ctx.query
  let bookInfo = JSON.parse(fs.readFileSync('/home/learn/koa/lexue/static/book.json'))
  let text = ''
  let msg = '书籍已存在'
  if (name != bookInfo.name) {
    text = fs.readFileSync('/home/learn/koa/lexue/static/' + bookInfo.name)
    msg = '书籍已更新'
  }
  ctx.response.body = {
    data: { text, name: bookInfo.name, serverPage: bookInfo.page },
    code: 200,
    msg: msg
  };
}

const setCookie = async (ctx, next) => {
  let { name, cook } = ctx.request.body
  let msg = 'cookie已更新'
  let code = 200
  try {
    await db.put(name + 'Cookie', cook)
  } catch (e) {
    msg = 'cookie失败'
    code = 500
  }
  ctx.response.body = {
    data: '',
    code: code,
    msg: msg
  };
}

const getCookie = async (ctx, next) => {
  let { name } = ctx.query
  let msg = 'cookie已获取'
  let code = 200
  let d = ''
  try {
    d = await db.get(name + 'Cookie')
  } catch (e) {
    msg = 'cookie失败'
    code = 500
  }
  ctx.response.body = {
    data: d,
    code: code,
    msg: msg
  };
}

const sanoSearch = async (ctx, next) => {
  let { url } = ctx.request.body

  let msg = 'url已发送'
  let code = 200
  // let po = bent('POST', 'https://saucenao.com', 'string', {'Content-Type':'multipart/form-data'})
  // let fdata = new FormData()
  // fdata.append('url',url)
  // console.log(axios)
  let res = await axios.post('https://saucenao.com/search.php',{url},{headers:{'Content-Type':'multipart/form-data'}})
    // console.log(res)
  ctx.response.body = {
    data: res.data,
    code: code,
    msg: msg
  };
}

const getWelink = async (ctx, next) => {
  let { url } = ctx.request.body

  let msg = 'url已发送'
  let code = 200
  // let po = bent('POST', 'https://saucenao.com', 'string', {'Content-Type':'multipart/form-data'})
  // let fdata = new FormData()
  // fdata.append('url',url)
  // console.log(axios)
  let res = await axios.get('https://welink345.233.tw/api/v1/client/subscribe?token=dd98c1389cde3423b90bb440ecd50c06')
  // await axios.get('https://welink345.233.tw/api/v1/client/subscribe?token=dd98c1389cde3423b90bb440ecd50c06',{},{})
    // console.log(res.data)
  ctx.response.body =res.data
} 

const getGRadio = async (ctx, next) => {
  let res = []
  // db.del('GRadioData')
  let rdata=await db.get('GRadioData').catch(e=>{
    console.log(e)
  })
  // let now = new Date().getTime()

  // if(!rdata || now - rdata.ts>3600000 ){
  //   let nres = await axios.get('https://www.gcores.com/gapi/v1/radios?page[limit]=80&page[offset]=0&sort=-published-at&include=category,user,djs&filter[list-all]=0&fields[radios]=title,desc,excerpt,is-published,thumb,app-cover,cover,comments-count,likes-count,bookmarks-count,is-verified,published-at,option-is-official,option-is-focus-showcase,duration,draft,audit-draft,user,comments,category,tags,entries,entities,similarities,latest-collection,collections,operational-events,portfolios,catalog-tags,media,djs,latest-album,albums,is-free')
  //   res = nres.data.data.map(e=>{
  //     return {
  //       label:e.attributes.title,
  //       value:e.id
  //     }
  //   })
  //   db.put('GRadioData',{list:res,ts:now}).catch(e=>{
  //     console.log(e)
  //   })
  // }else{
  //   res = rdata.list
  // }
  res = rdata.list
  ctx.response.body ={data:res}
} 
const getRemoteRadio = async ()=>{
  let now = new Date().getTime()
  let nres = await axios.get('https://www.gcores.com/gapi/v1/radios?page[limit]=80&page[offset]=0&sort=-published-at&include=category,user,djs&filter[list-all]=0&fields[radios]=title,desc,excerpt,is-published,thumb,app-cover,cover,comments-count,likes-count,bookmarks-count,is-verified,published-at,option-is-official,option-is-focus-showcase,duration,draft,audit-draft,user,comments,category,tags,entries,entities,similarities,latest-collection,collections,operational-events,portfolios,catalog-tags,media,djs,latest-album,albums,is-free')
    res = nres.data.data.map(e=>{
      return {
        label:e.attributes.title,
        value:e.id
      }
    })
    db.put('GRadioData',{list:res,ts:now}).catch(e=>{
      console.log(e)
    })
    console.log('获取机核')
}

const saveRadioPlayLog = async (ctx, next) => {
  let { info } = ctx.request.body
  // console.log(info)
  //info {id,at}
  let pdata = await db.get('playLogData').catch(e=>{
    console.log(e)
  }) || {}
  // console.log(pdata)
  pdata[info.id] = {at:info.at,ts:new Date().getTime(),id:info.id}
  await db.put('playLogData',pdata).catch(e=>{
    ctx.response.body ={msg:'保存错误',data:null}
  })
  ctx.response.body ={msg:'保存成功',data:{}}
}

const getRadioPlayLog = async (ctx, next) => {
  let { id } = ctx.query
  let msg = '获取成功'
  let pdata = await db.get('playLogData').catch(e=>{
    console.log(e)
  }) || {}
  let now = new Date().getTime()
  let valDelList = Object.values(pdata).filter(e=>{
    return now - e.ts > 2626560000 
  })
  valDelList.forEach(e=>{
    delete pdata[e.id]
  })
  await db.put('playLogData',pdata).catch(e=>{
    ctx.response.body ={msg:'更新错误',data:null}
  })

  ctx.response.body ={msg,data:pdata[id] || {}}
}

const getLastRadioPlayLog = async (ctx, next) => {  //获取最近一个播放的电台信息
  let msg = '获取成功'
  let pdata = await db.get('playLogData').catch(e=>{
    console.log(e)
  }) || {}
  let valueList = Object.values(pdata).sort((a,b)=>{
    return b.ts - a.ts 
  })
  ctx.response.body ={msg,data:valueList[0] || {}}
}


//todo : 弹幕onedrive下载与格式转换

const wgetToRecord = async (ctx, next) => {
  let { url } = ctx.request.body
  console.log(url)
  child_process.exec(`cd /home/learn/koa/lexue/script && node wgetGet.js '${url}'`)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'wget下载中'
  };
}

const saveGadioAndUpKey = async (ctx, next) => {
  let { url } = ctx.request.body
  child_process.exec(`cd /home/learn/koa/lexue/script && node saveGadioAndUpKey.js '${url}'`)
  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'Gradio下载中'
  };
}
const saveGadioOver = async (ctx, next) => {
  console.log(global.mySocket.emit)
  global.mySocket.emit('GradioOK')
  
  ctx.response.body = {
    data: '',
    code: 200,
    msg: 'Gradio OK'
  };
}

const LoopFn = async ()=>{
  while(true){

    getRemoteRadio()
    await sleep(10800000)
    
  }
}
LoopFn()



module.exports = {
  'POST /mv_upload/login': login,
  'GET /newCen/updateEcc': updateEcc,
  'GET /newCen/rebootLexue': rebootLexue,
  'GET /newCen/gitPullOnedriveInedx': gitPullOnedriveInedx,
  'GET /newCen/getAccountList': getAccountList,
  'GET /newCen/free/testExten': testExten,
  'GET /newCen/free/getAliRefreshToken': getAliRefreshToken,
  'POST /newCen/saveAccountList': saveAccountList,
  'POST /newCen/editAccountList': editAccountList,
  'POST /newCen/deleteAccout': deleteAccout,
  'POST /newCen/syncVideoToYou': syncVideoToYou,
  'POST /newCen/testIpc': testIpc,
  'GET /newCen/getExistBook': getExistBook,
  'GET /newCen/free/getExistBook': getExistBook,
  'GET /newCen/free/getAllVideoRever/:mid/:p': getAllVideoRever,
  'GET /newCen/free/getV8': getV8,
  'GET /newCen/free/getTB': getTB,
  'GET /newCen/free/getV8Comment/:tid/:p': getV8Comment,
  'GET /newCen/free/getTBComment': getTBComment,
  'GET /newCen/free/getV8Post/:tid/:p': getV8Post,
  'GET /newCen/free/getTBPost': getTBPost,
  'GET /newCen/free/getPageTBComment': getPageTBComment,
  'POST /newCen/free/replyTB': replyTB,
  'POST /newCen/free/replyComment': replyComment,
  'GET /newCen/free/getTbs': getTbs,
  'GET /newCen/free/updateTbs': updateTbs,
  'POST /newCen/free/backupImg': backupImg,
  'GET /newCen/free/getCurbook': getCurbook,
  'POST /newCen/free/uploadTbImg': uploadTbImg,
  'POST /newCen/free/setCookie': setCookie,
  'GET /newCen/free/getCookie': getCookie,
  'POST /newCen/free/sanoSearch': sanoSearch,
  'GET /newCen/free/getWelink': getWelink,
  'GET /newCen/getGRadio': getGRadio,
  'POST /newCen/saveRadioPlayLog': saveRadioPlayLog,
  'GET /newCen/getRadioPlayLog': getRadioPlayLog,
  'POST /newCen/wgetToRecord': wgetToRecord,
  'GET /newCen/getLastRadioPlayLog': getLastRadioPlayLog,
  'POST /newCen/saveGadioAndUpKey': saveGadioAndUpKey,
  'POST /newCen/free/saveGadioOver': saveGadioOver,
  // 'GET /timer/start_time_count': start_time_count,
  // 'GET /timer/reset_time_count': reset_time_count,
  // 'GET /timer/stop_time_count': stop_time_count,
  // 'GET /timer/get_left_time': get_left_time
};