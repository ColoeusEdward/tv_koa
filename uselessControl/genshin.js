/*
 * @Author: your name
 * @Date: 2021-02-28 04:00:11
 * @LastEditTime: 2021-03-17 11:22:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/controller/genshin.js
 */
const miUtil = require('/root/pm_s/record/auto-encode/genshin/miyoshe.js')
const daily = require('/root/pm_s/record/auto-encode/daily_work')


var month_info = async (ctx, next) => {
  // var name = ctx.params.name;
  let res = await  miUtil.get_mounth_info()
  ctx.response.body = res;
};

let sign_info = async (ctx, next) => {
  // var name = ctx.params.name;
  let res = await  miUtil.get_sign_info()
  ctx.response.body = res;
};

let record_mass = async (ctx, next) => {
  // var name = ctx.params.name;
  let re = await daily.record_mass()
  
  ctx.response.body = re;
};

let record_ore = async (ctx, next) => {
  // var name = ctx.params.name;
  let re = await daily.record_ore()
  // let res = re==true?'ok':'失败'
  ctx.response.body = re;
};

let check_ore = async (ctx, next) => {
  // var name = ctx.params.name;
  let re = await daily.check_ore()
  // let res = re==true?'ok':'失败'
  console.log(re);
  ctx.response.body = re;
};

let check_mass = async (ctx, next) => {
  // var name = ctx.params.name;
  let re = await daily.check_mass_analyzer()
  // let res = re==true?'ok':'失败'
  ctx.response.body = re;
};

let get_stone_exchange = async (ctx, next) => {
  // var name = ctx.params.name;
  let re = await miUtil.get_stone_exchange()
  // let res = re==true?'ok':'失败'
  ctx.response.body = re;
};

module.exports = {
  'GET /genshin/month': month_info,
  'GET /genshin/sign_info': sign_info,
  'GET /genshin/record_mass': record_mass,
  'GET /genshin/record_ore': record_ore,
  'GET /genshin/check_ore': check_ore,
  'GET /genshin/check_mass': check_mass,
  'GET /genshin/get_stone_exchange': get_stone_exchange,
};