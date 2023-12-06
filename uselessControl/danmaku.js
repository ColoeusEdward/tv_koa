const fs = require('fs')
var xmlParser = require('fast-xml-parser');
const addr = `/root/pm_s/record/dan/curDan`
const child_process = require('child_process')
const downDan = require('../mixin/getOnedriveDan')
let ms = 0 //


let getCurDan = async (ctx, next) => {
  ctx.response.body = {};
  // let body = ctx.request.body
  // console.log(ctx.request.query);
  var options = {
    // attributeNamePrefix : "_@",
    // attrNodeName: "p", //default is 'false'
    // textNodeName : "#text",
    ignoreAttributes : false,
    // ignoreNameSpace : false,
    // allowBooleanAttributes : false,
    // parseNodeValue : true,
    parseAttributeValue : true,
    // trimValues: true,
    // cdataTagName: "__cdata", //default is 'false'
    // cdataPositionChar: "\\c",
    // parseTrueNumberOnly: false,
    // arrayMode: false, //"strict"
    // attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    // tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
    // stopNodes: ["parse-me-as-string"]
};

  let danData = readDanFile()
  if(danData == 0){
    ctx.body = "{}"
    return false
  }
  // console.log(danData.toString());
  let Json = xmlParser.parse(danData.toString(),options)
  let danJson = null;

  // if(ctx.params){
  //   // danJson = 
  // }else{
  //   danJson = BuildDanJson(Json.i.d)
  // }
danJson = BuildDanJson(Json.i.d)
  // danJson.data = danJson.data.slice(0,100)

  // Json.i.d = Json.i.d.slice(0,100)

  ctx.body = danJson

  // ctx.body = danData.toString()
  // console.log(danData.length);

};

const getOnedriveDan = (ctx, next) => {
  let body = ctx.request.body
  body.url && downDan.init(body.url)
  
  ctx.body = {
    code:200,
    data:{},
    msg:'下载中'
  }
}

const setMs = (ctx, next) => {
  let body = ctx.request.body
  ms = body.ms
  
  ctx.body = {
    code:200,
    data:{},
    msg:'ms已保存'
  }
}

const getMs = (ctx, next) => {
  
  ctx.body = {
    code:200,
    data:{
      ms:ms
    },
    msg:'获取成功'
  }
}

module.exports = {
  'GET /danmaku/curDan/v3': getCurDan,
  'POST /danmaku/getOnedriveDan': getOnedriveDan,
  'GET /danmaku/setMs': setMs,
  'GET /danmaku/getMs': getMs,
  // 'GET /curDan/v3/:text': getCurDan,
};

function readDanFile(){
  let readDir = fs.readdirSync(addr);
  console.log(readDir);
  if(readDir.length == 0){
    return 0
  }
  let danFile = readDir[0]
  let danData=fs.readFileSync(`${addr}/${danFile}`);
  return danData
  
}

function BuildDanJson(dd){
  let delayTime = ms || 0 // 手动添加弹幕延迟时间（ms）
  let obj = {
    code:0,
    data:[]
  }
  for (let index = 0; index < dd.length; index++) {
    let e = dd[index];
    let text = e['#text']
    let p = e['@_p'].split(',')
    let item = []
    item[0] = p[0]+delayTime//弹幕时间戳
    switch (p[1]){
      case 1 || 2 || 3:
        item[1] = 0
        break;
      case 4:
        item[1] = 2
        break;
      case 5:
        item[1] = 1
        break;
      default:
        item[1] = 0
    }
    item[2] = p[3]
    item[3] = p[6]
    item[4] = text
    obj.data.push(item)
  }
  return obj
}

function BuildDanOnlyText(){
  let data = []
  for (let index = 0; index < dd.length; index++) {
    let text = e['#text']
    data.push(text)
  }

}