/*
 * @Author: your name
 * @Date: 2021-09-27 08:34:50
 * @LastEditTime: 2023-08-30 10:44:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/mixin/upload.js
 */
const fs = require('fs');
const {
  isFileExisted,
  isIterable
} = require('../util/util')
const child_process = require('child_process')

const uploadEveryThing = (files, dir) => {
  let isGood = true
  if (!fs.existsSync(dir)) {
    console.log('上传路径不存在')
    isGood = false
    reslove(isGood)
  }
  return new Promise(reslove => {
    const file = files; // 获取上传文件
    // console.log(file);
    // 
    // buildDir(file, 'temp')
    // return

    const reader = fs.createReadStream(file.path);
    // if(plat=='android'){
    //   file.name = file.name.slice(1)
    // }
    let filePath = dir + `/${file.name}`;
    console.log('上传路径'+filePath);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    upStream.on('finish', () => {
      console.log('上传finish')
      reslove(isGood)
    })
    // if (isIterable(files)) {
    //   for (let file of files) {
    //     // 创建可读流
    //     buildDir(file, 'temp')
    //     // return

    //     const reader = fs.createReadStream(file.path);
    //     // 获取上传文件扩展名

    //     // if(plat=='android'){
    //     //   file.name = file.name.slice(1)
    //     // }
    //     let filePath = dir + `/${file.name}`;
    //     // 创建可写流
    //     const upStream = fs.createWriteStream(filePath);
    //     // 可读流通过管道写入可写流
    //     reader.pipe(upStream);
    //   }
    // } else {
    //   // 上传单个文件
    //   const file = files; // 获取上传文件
    //   // console.log(file);
    //   // 
    //   // buildDir(file, 'temp')
    //   // return

    //   const reader = fs.createReadStream(file.path);
    //   // if(plat=='android'){
    //   //   file.name = file.name.slice(1)
    //   // }
    //   let filePath = dir + `/${file.name}`;
    //   console.log(filePath);
    //   // 创建可写流
    //   const upStream = fs.createWriteStream(filePath);
    //   // 可读流通过管道写入可写流
    //   reader.pipe(upStream);
    //   // console.log('nonono');
    // }

  })


}

const deployUp = async (files) => {
  const dir = '/home/learn/koa/newup'
  if (await isFileExisted(`${dir}/dist.zip`)) {
    child_process.execSync(`mv ${dir}/dist.zip ${dir}/backup`)
  }
  if (await uploadEveryThing(files, dir)) {
    child_process.execSync(`unzip -o ${dir}/dist.zip -d ${dir}`)
  }
  // console.log('uplaodres',res)
  // res && 
}

const deploySun = async (files) => {
  const dir = '/home/learn/koa/sun'
  if (await isFileExisted(`${dir}/dist.zip`)) {
    child_process.execSync(`mv ${dir}/dist.zip ${dir}/backup`)
  }
  if (await uploadEveryThing(files, dir)) {
    child_process.execSync(`rm -rf ${dir}/assets`)
    child_process.execSync(`unzip -o ${dir}/dist.zip -d ${dir}`)
  }
  // console.log('uplaodres',res)
  // res && 
}
const upTemp = async (files) => {
  const dir = '/root/pm_s/record/temp'
  uploadEveryThing(files, dir)
}

const upBook = (files) => {
  const dir = '/home/learn/koa/lexue/static'
  uploadEveryThing(files, dir)
}

const upElectron = async (files) => {
  const dir = '/root/pm_s/record/electronUpdate'
  let existRes = false
  try {
    existRes = await isFileExisted(`${dir}/nsis.zip`)  //promise不要乱用reject
  } catch (error) {
    console.log('文件存在检查错误',error)
  }
  
  console.log('文件存在检查结果'+existRes)
  if (existRes) {
    child_process.execSync(`mv ${dir}/nsis.zip ${dir}/bak`)
    child_process.execSync(`cd ${dir} && find . -type f -delete`)
  }
  await uploadEveryThing(files, dir)
  child_process.execSync(`unzip -o ${dir}/nsis.zip -d ${dir}`)
}
module.exports = {
  uploadEveryThing,
  deployUp
  ,deploySun
  , upTemp
  , upBook
  , upElectron
}

function buildDir(file, dir) { //自动创建文件夹,dir为指定的用来容纳所有文件的文件夹
  if (file.name.search(`/`)) {
    let NameMath = new RegExp(`(.+/)*(?=.+\..+)`, 'g')
    // console.log(file.name);
    let res = NameMath.exec(file.name)
    let resArr = res[0].split('/')
    // console.log(resArr);
    resArr.pop()
    let inPath = ''

    // 层层创建文件夹
    resArr.forEach(e => { //foreach 不支持continue
      inPath = inPath + e + '/'
      if (totalPath.includes(inPath)) {
        return true
      }
      totalPath.push(inPath)
      console.log(inPath);
      try {
        child_process.execSync(`mkdir ${myPath}/${dir}/${inPath}`)
      } catch (e) {
        console.log('mkdir error');
      }


    })
    // console.log(resArr);
    // let arr = Array.slice(res)
    // console.log(arr);
  }
}