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
// const {
//   getMem
//   , testIpc
// } = require('./wsFn')
const {
  sleep, getJSON, send_mail
} = require('../../util/util')
const { initModbusTcp } = require('./modebusTcp')
const { wsPort } = require('../../util/enum')

const buildTvWs = (io) => {
  let isConnect = false
  initModbusTcp()
  io.on('connection', socket => {
    global.mySocket = socket
    isConnect = true
    console.log('ws on connect');

    socket.on("data", (arg) => {
      console.log(arg); // world
    });

    socket.emit('hello', 'world')

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

  });
  io.listen(wsPort);
  console.log('ws connected')
}

module.exports = {
  buildTvWs
}

