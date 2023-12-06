/*
 * @Author: your name
 * @Date: 2021-10-14 00:40:13
 * @LastEditTime: 2023-08-22 05:40:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/mixin/ws.js
 */
const fs = require('fs')
const child_process = require('child_process')
const {
  getMem
  , testIpc
} = require('./wsFn')
const {
  sleep, getJSON, send_mail
} = require('../../util/util')
let timer = null
let total = 28800000

fs.readFileAsync = function (filename) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, function (err, data) {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};
const { useBuildNovel } = require('./buildNovel')
const { on } = require('events')
const bn = useBuildNovel()
const checkOtherBookList = (data) => {
  if (!data.otherList) {
    data.otherList = []
    data.otherList.push({
      page: data.page,
      name: data.name,
      ts: new Date().getTime()
    })
  } else {
    let item = data.otherList.find(e => e.name == data.name)
    if (item) {
      item.page = data.page
      item.ts = new Date().getTime()
    } else {
      data.otherList.push({
        page: data.page,
        name: data.name,
        ts: new Date().getTime()
      })
    }
  }

}
const findFromOtherBook = (data) => {
  let item = data.otherList.find(e => e.name == data.name)
  if (item) {
    data.page = item.page
    bn.page.v = item.page
  }
}
const checkBookExpired = (data) => {
  data.otherList = data.otherList.filter(e => {
    let now = new Date().getTime()
    return now - e.ts * 1 < 2678400000
  })
}
const buildWs = (io) => {
  let isConnect = false

  io.on('connection', socket => {
    global.mySocket = socket
    isConnect = true
    console.log('ws on connect');
    socket.on("data", (arg) => {
      console.log(arg); // world
    });

    socket.emit('hello', 'world')

    socket.on('start', () => {
      if (!timer) {
        timer = new Timer(total)
      }
      timer.count()
      socket.emit('start', '计时已开始');
    });

    socket.on('stop', () => {
      let res = ''
      if (timer) {
        timer.stop()
        res = '已停止计时'
      } else {
        res = '计时器不存在'
      }
      socket.emit('stop', res);
    });

    socket.on('reset', () => {
      let res = ''
      if (timer) {
        timer.reset()
        res = '已重置计时'
      } else {
        res = '计时器不存在'
      }
      socket.emit('reset', res);
    });

    socket.on('getTimeWithTotal', () => {
      let res = ''
      if (timer) {
        res = {
          time: timer.total_time
          , total: total
        }
      } else {
        res = {
          time: 0
          , total: total
        }
      }
      socket.emit('getTimeLoop', res);
    });

    socket.on('getTimeLoop', async () => {
      while (isConnect) {
        let res = ''
        if (timer) {
          res = timer.total_time
        } else {
          res = 0
        }
        socket.emit('getTimeLoop', res);
        await sleep(1000)
      }
    })

    socket.on('getMem', async () => {
      while (isConnect) {
        let res = await getMem()
        socket.emit('getMem', res);
        await sleep(5000)
      }
    });

    socket.on('getMemOnce', async () => {
      let res = await getMem()
      socket.emit('getMem', res);
    });

    socket.on('disconnect', () => {
      isConnect = false
      console.log('socket disconnect'); // the Set contains at least the socket ID
    });

    socket.on('testIpc', () => {
      testIpc()
    });
    // send_mail({title:'error msg',desrc:e,name:'fuck'},'1103874618@qq.com','novel bot') }
    socket.on('nextPage', () => {
      // console.log('page', bn.page.v)
      bn.page.v = bn.page.v * 1 + 1;
      bn.readNovel(bn.page.v, socket)
      // let pageJSON = fs.readFileSync('/home/learn/koa/lexue/static/book.json')
      fs.readFileAsync('/home/learn/koa/lexue/static/book.json')
        .then(res => {
          let pageJSON = res
          let data
          try {
            data = JSON.parse(pageJSON.toString())
          } catch (e) {
            console.log('错误前的json  ' + pageJSON.toString())
            send_mail({ title: 'error msg', desrc: e, name: 'fuck' }, '1103874618@qq.com', 'novel bot')
            return
          }
          // console.log(pageJSON.toString())

          data.page = bn.page.v
          checkOtherBookList(data)
          let d = JSON.stringify(data)
          // console.log('dd',d)
          d && fs.writeFileSync('/home/learn/koa/lexue/static/book.json', d, (e) => { })
        })

    })
    socket.on('prevPage', () => {
      bn.page.v > 0 && (bn.page.v = bn.page.v * 1 - 1);
      bn.readNovel(bn.page.v, socket)
      let pageJSON = fs.readFileSync('/home/learn/koa/lexue/static/book.json')
      let data
      try {
        data = JSON.parse(pageJSON.toString())
      } catch (e) {
        console.log('错误前的json  ' + pageJSON.toString())
        send_mail({ title: 'error msg', desrc: e, name: 'fuck' }, '1103874618@qq.com', 'novel bot')
        return
      }
      data.page = bn.page.v
      checkOtherBookList(data)
      let d = JSON.stringify(data)
      d && fs.writeFileSync('/home/learn/koa/lexue/static/book.json', d, (e) => { })
    })
    socket.on('setPage', (page) => {
      bn.page.v = page;
      bn.readNovel(page, socket)
      let data = getJSON('/home/learn/koa/lexue/static/book.json')
      data.page = bn.page.v
      let d = JSON.stringify(data)
      d && fs.writeFileSync('/home/learn/koa/lexue/static/book.json', d, (e) => { })
    })
    socket.on('changeBook', (book) => {
      bn.data.name = book
      let data = getJSON('/home/learn/koa/lexue/static/book.json')
      data.name = book
      findFromOtherBook(data)
      checkBookExpired(data)
      data && fs.writeFileSync('/home/learn/koa/lexue/static/book.json', JSON.stringify(data), () => { })
      bn.readNovel(bn.page.v, socket)
      console.log(book)
    })
  });
  io.listen(3100);
  console.log('ws connected')
}

module.exports = {
  buildWs
}

class Timer {
  constructor(tt) {
    this.source_tt = tt
    this.total_time = tt
    this.interval = 1000
    this.is_stop = 1
    this.init()
  }

  init() {

  }

  count() {
    if (this.is_stop == 0) {
      return
    }
    this.is_stop = 0
    let _this = this
    let tm = setInterval(
      () => {
        _this.total_time -= _this.interval
        if (_this.total_time <= 0 || _this.is_stop == 1) {
          clearInterval(tm)
        }
      },
      _this.interval
    )
  }

  reset() {
    this.total_time = this.source_tt
  }

  stop() {
    this.is_stop = 1
  }
}