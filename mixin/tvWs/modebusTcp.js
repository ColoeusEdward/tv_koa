const {
  sleep, getJSON, send_mail, sortByteNum, ajaxPromiseAll
} = require('../../util/util')
const { host, unitId, port, timeSpan, numOrder, hostProd, dataAddress0, dataAddress200, dataAddress100 } = require('../../util/enum')
const Modbus = require('jsmodbus')
const net = require('net')
// var blessed = require('blessed')
//   , contrib = require('blessed-contrib')
//   , screen = blessed.screen()
//   , grid = new contrib.grid({ rows: 1, cols: 2, screen: screen })
//   const Table = require( '@lvchengbin/cli-table' );

const msocket = new net.Socket()
const client = new Modbus.client.TCP(msocket)
const options = {
  'host': global.isProd ? hostProd : host,
  'port': port
}
let reconnectCount = 0
let closedOnPurpose = false
// const renderData = () => {
//   var line = grid.set(0, 0, 1, 1, contrib.line,
//     {
//       style:
//       {
//         line: "yellow"
//         , text: "green"
//         , baseline: "black"
//       }
//       , xLabelPadding: 3
//       , xPadding: 5
//       , label: 'Stocks'
//     })
//   var map = grid.set(0, 1, 1, 1, contrib.map, { label: 'Servers Location' })
//   var lineData = {
//     x: ['t1', 't2', 't3', 't4'],
//     y: [5, 1, 7, 5]
//   }

//   line.setData([lineData])

//   screen.key(['escape', 'q', 'C-c'], function (ch, key) {
//     return process.exit(0);
//   });

//   screen.render()
// }
// const renderData = () => {

// const table = new Table( [
//     Array( 4 ).fill( '' ).map( () => 34234 ),
//     Array( 4 ).fill( '' ).map( () => 55555 ),
//     Array( 4 ).fill( '' ).map( () => 2344 ),
//     Array( 4 ).fill( '' ).map( () => 777 ),
//     Array( 4 ).fill( '' ).map( () => 345345),
//     Array( 4 ).fill( '' ).map( () => 7879 ),
//     Array( 4 ).fill( '' ).map( () => 56777 )
// ] );

// table.setHeader( [ 'Header1', 'Header2', 'Header3', 'Header4' ] );

// console.log( table.inspect() );
// }
const start = () => {
  // make some calls
  // loopRead('readCoils',readCoi,true)

  // loopRead(() => {
  //   return client.readHoldingRegisters(0,2)
  // }, readHold, true)

  loopRead(() => {
    return ajaxPromiseAll([client.readHoldingRegisters(0, 10), client.readHoldingRegisters(200, 18), client.readHoldingRegisters(100, 10), client.readCoils(0, 2)])
  }, analyHold, true)
}
const analyHold = (respList) => { //获取并解析数据
  let data = {}
  let buffer0 = respList[0].response.body._valuesAsBuffer
  let buffer200 = respList[1].response.body._valuesAsBuffer
  let buffer100 = respList[2].response.body._valuesAsBuffer
  let bufferColi = respList[3].response.body._valuesAsBuffer
  let coliStr = bufferColi.readInt8(0)
  data.state = !(coliStr == 2 || coliStr == 3 || coliStr == 6)
  // console.log("🚀 ~ file: modebusTcp.js:33 ~ analyHold ~ bufferColi:", bufferColi)
  Object.keys(dataAddress0).map(key => {
    let enName = dataAddress0[key]
    let start = key.slice(0, -1)
    let length = key.slice(-1)
    let tbuffer = sortByteNum(numOrder, buffer0.subarray(start * 2, start + length * 2))
    data[enName] = tbuffer.readFloatBE()
  })
  Object.keys(dataAddress200).map(key => {
    let enName = dataAddress200[key]
    let start = key.slice(0, -1)
    let length = key.slice(-1)
    let tbuffer = sortByteNum(numOrder, buffer200.subarray(start * 2, start + length * 2))
    data[enName] = tbuffer.readFloatBE()
  })
  Object.keys(dataAddress100).map(key => {
    let enName = dataAddress100[key]
    let start = key.slice(0, -1)
    let length = key.slice(-1)
    let tbuffer = sortByteNum(numOrder, buffer100.subarray(start * 2, start + length * 2))
    data[enName] = tbuffer.readFloatBE()
  })
  console.log("🚀 ~ file: modebusTcp.js:19 ~ analyHold ~ data:", data)
  // renderData()

  if (global.mySocket)
    global.mySocket.emit('tcpData', data)
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}
const readHold = (resp) => {
  // resp will look like { response : [TCP|RTU]Response, request: [TCP|RTU]Request }
  // the data will be located in resp.response.body.coils: <Array>, resp.response.body.payload: <Buffer>
  // console.log(resp.response.body);
  let originBuffer = resp.response.body._valuesAsBuffer
  // console.log("🚀 ~ file: modebusTcp.js:27 ~ readHold ~ arbuffer:", arbuffer)
  let tempbuffer = sortByteNum(numOrder, originBuffer)
  // console.log("🚀 ~ file: modebusTcp.js:25 ~ arbuffer:", arbuffer[0].toString('binary'))
  // console.log("🚀 ~ file: modebusTcp.js:25 ~ buffer:", tempbuffer.readFloatBE())
  // let b2 =new Uint16Array([`${buffer[1]}${buffer[0]}`])
  // console.log("🚀 ~ file: modebusTcp.js:27 ~ b2:", b2)
  let data = {
    meter: tempbuffer.readFloatBE()
  }
  console.log("🚀 ~ file: modebusTcp.js:35 ~ readHold ~ data:", data)
  if (global.mySocket) {
    global.mySocket.emit('tcpData', data)
  }

}
const readCoi = (resp) => {
  let originBuffer = resp.response.body._valuesAsBuffer
  console.log("🚀 ~ file: modebusTcp.js:52 ~ originBuffer:", originBuffer)
}
const loopRead = (readFn, cb, needLoop,) => {
  return readFn().then((resp) => {
    cb(resp)
    return sleep(timeSpan)
  }).then(() => {
    if (needLoop) {
      loopRead(readFn, cb, needLoop)
    }
  }).catch((err) => {
    console.log('client readcatch', err);
  })
}
const initModbusTcp = () => {
  msocket.on('connect', function () {
    console.log("🚀 ~ file: ws.js:45 ~ modbus tcp connect:")
    start()
  });
  msocket.on('data', (data) => {
    // console.log("🚀 ~ file: modebusTcp.js:104 ~ msocket.on ~ data:", data)

  })
  msocket.on('close', function () {
    console.log('Client closed, stopping interval.')
    if (!closedOnPurpose) {
      sleep(1000).then(() => {
        console.log('client reconnect try')
        reconnectCount++;
        msocket.connect(options)
      })
    }
  })
  msocket.connect(options)
}

module.exports = {
  initModbusTcp
}