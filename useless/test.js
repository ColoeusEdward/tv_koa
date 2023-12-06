/*
 * @Author: your name
 * @Date: 2021-05-04 01:43:30
 * @LastEditTime: 2021-06-15 00:14:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/controller/test.js
 */
const fs = require('fs')


let GetEquTypeTreeListByCompanyId = async (ctx, next) => {
  ctx.response.body = commonFunc('equTypeTreeList')
}

let GetVersionByCompanyId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetVersionByCompanyId')
}

let GetDevConfigByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDevConfigByVerId')
}

let GetClientConfigPageListByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetClientConfigPageListByVerId')
}

let GetProtocolByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetProtocolByVerId')
}

let GetListByProtocol = async (ctx, next) => {
  ctx.response.body = commonFunc('GetListByProtocol')
}

let GetDemoByTypeId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDemoByTypeId')
}

let GetClientConfigByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetClientConfigByVerId')
}

let GetDataAddrPageListByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDataAddrPageListByVerId')
}

let GetDataAddrByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDataAddrByVerId')
}

let GetListByProto = async (ctx, next) => {
  ctx.response.body = commonFunc('GetListByProto')
}

let GetListByRegiType = async (ctx, next) => {
  ctx.response.body = commonFunc('GetListByRegiType')
}

let GetOEEDataAddr = async (ctx, next) => {
  ctx.response.body = commonFunc('GetOEEDataAddr')
}

let GetDataAddrListByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDataAddrListByVerId')
}

let GetOEEParam = async (ctx, next) => {
  ctx.response.body = commonFunc('GetOEEParam')
}

let GetOutputDataAddrByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetOutputDataAddrByVerId')
}

let GetOutputParamByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetOutputParamByVerId')
}

let GetStateAddrByVerId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetStateAddrByVerId')
}

let GetPageList = async (ctx, next) => {
  ctx.response.body = commonFunc('GetPageList')
}

let UserEquRelation = {
  GetPageList:async (ctx, next) => {
    ctx.response.body = commonFunc('UserEquRelationGetPageList')
  }
}

let GetDetailList = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDetailList')
}
let GetDetailList2 = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDetailList2')
}

let GetDemoVersionPageList = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDemoVersionPageList')
}
let AppUpdateGetPageList = async (ctx, next) => {
  ctx.response.body = commonFunc('AppUpdateGetPageList')
}
let testFormData = async (ctx, next) => {
  let data = ctx.request.body
  let file = ctx.request.files.files
  let header = ctx.request.header
  // console.log(header);
  // console.log(file);
  let res = {}
  res.code = 200
  res.msg='Success'
  res.data = data
  ctx.response.body = res
}
let GetEquByCompanyId = async (ctx, next) => {
  ctx.response.body = commonFunc('GetEquByCompanyId')
}

let GetTreeList = async (ctx, next) => {
  ctx.response.body = commonFunc('GetTreeList')
}
let GetDeviceState = async (ctx, next) => {
  ctx.response.body = commonFunc('GetDeviceState')
}


module.exports = {
  'GET /IotDevice/Version/GetEquTypeTreeListByCompanyId': GetEquTypeTreeListByCompanyId,
  'GET /IotDevice/Version/GetVersionByCompanyId': GetVersionByCompanyId,
  'GET /IotDevice/VerIOTManage/GetDevConfigByVerId': GetDevConfigByVerId,
  'GET /IotDevice/VerIOTManage/GetClientConfigPageListByVerId': GetClientConfigPageListByVerId,
  'GET /IotDevice/VerIOTManage/GetProtocolByVerId': GetProtocolByVerId,
  'GET /IotDevice/VerIOTManage/GetListByProtocol': GetListByProtocol,
  'GET /IotDevice/Version/GetDemoByTypeId': GetDemoByTypeId,
  'GET /IotDevice/VerIOTManage/GetClientConfigByVerId': GetClientConfigByVerId,
  'GET /IotDevice/VerIOTManage/GetDataAddrPageListByVerId': GetDataAddrPageListByVerId,
  'GET /IotDevice/VerIOTManage/GetDataAddrByVerId': GetDataAddrByVerId,
  'GET /IotDevice/VerIOTManage/GetListByProto': GetListByProto,
  'GET /IotDevice/VerIOTManage/GetListByRegiType': GetListByRegiType,
  'GET /IotDevice/VerIOTManage/GetOEEDataAddr': GetOEEDataAddr,
  'GET /IotDevice/VerIOTManage/GetDataAddrListByVerId': GetDataAddrListByVerId,
  'GET /IotDevice/VerIOTManage/GetOEEParam': GetOEEParam,
  'GET /IotDevice/VerIOTManage/GetOutputDataAddrByVerId': GetOutputDataAddrByVerId,
  'GET /IotDevice/VerIOTManage/GetOutputParamByVerId': GetOutputParamByVerId,
  'GET /IotDevice/VerIOTManage/GetStateAddrByVerId': GetStateAddrByVerId,
  'GET /IotDevice/UserEquType/GetPageList': GetPageList,
  'GET /IotDevice/UserEquRelation/GetPageList': UserEquRelation.GetPageList,
  'GET /SystemModule/CatalogItem/GetDetailList': GetDetailList,
  'GET /SystemModule/CatalogItem/GetDetailList2': GetDetailList2,
  'GET /IotDevice/Version/GetDemoVersionPageList': GetDemoVersionPageList,
  'GET /AppUpdate/AppUpdate/AppUpdateGetPageList': AppUpdateGetPageList,
  'POST /AppUpdate/AppUpdate/testFormData': testFormData,
  'GET /AppUpdate/AppUpdate/GetEquByCompanyId': GetEquByCompanyId,
  'GET /IotDevice/HistoryData/GetTreeList': GetTreeList,
  'GET /IotDevice/StateManagement/GetDeviceState': GetDeviceState,
}

let commonFunc = (name)=>{
  let datastr = fs.readFileSync(__base + `/static/tempJson/${name}.json`)
  let res = {}
  let data = JSON.parse(datastr)
  res.code = 200
  res.msg='Success'
  res.data = data
  return res
}
