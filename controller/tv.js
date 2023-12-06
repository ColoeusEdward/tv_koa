const fs = require('fs')
const child_process = require('child_process')
const formurlencoded = require('form-urlencoded')
var FormData = require('form-data');
const axios = require('axios');
const {
  secret, sleep
} = require('../util/util')
const { Level } = require('level');
const { buildTvWs } = require('../mixin/tvWs/ws');
const io = require('socket.io')();
const db = new Level(__base + 'ace', { valueEncoding: 'json' })
function init() {
  console.log('ws启动');
  return buildTvWs(io)
}
init()

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


module.exports = {
  'GET /tv/getTest': getCookie,

}