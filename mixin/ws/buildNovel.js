/*
 * @Author: your name
 * @Date: 2022-01-18 05:45:26
 * @LastEditTime: 2022-06-30 02:43:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/script/buildNoval.js
 */
const fs = require('fs')
const { open } = require('fs/promises')

const useBuildNovel = () => {
  let pageJSON = fs.readFileSync('/home/learn/koa/lexue/static/book.json')
  let data = JSON.parse(pageJSON)
  const page = {v:data.page} 
  const readNovel = async (p, socket) => {
    let start = 1092 * p
    let end = start + 1094
    const fileHandle = await open(`/home/learn/koa/lexue/static/${data.name}`)
    const readStream = fileHandle.createReadStream({ start: start, end: end, encoding: 'utf-8' });
    let content = ''
    readStream.on('data', (data) => {
      // if(content.length <= 50){
      content += data
      // }
      // if(content.length>50){
      //   console.log(content)
      //   // readStream.destroy()
      // }
    })
    readStream.on('end', () => {
      if (content.length == 0) {
        content = 'over-'+page.v
      }
      let resCon = spliceStr(content)
      // let resCon = content
      let data = {
        text: resCon
        , page: p
      }
      socket && socket.emit('novelContent', data)
    })
  }

  const spliceStr = (content) => {
    let str = content.replace(/\n/g, ' ')
    return str
  }

  return {
    readNovel
    , page
    , data
  }
}

module.exports = {
  useBuildNovel
}

// const { readNovel } = useBuildNovel()
// readNovel()