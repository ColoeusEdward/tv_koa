/*
 * @Author: your name
 * @Date: 2021-10-16 02:36:37
 * @LastEditTime: 2023-08-16 01:27:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /lexue/script/updateEcc.js
needUpdate */
const process = require('process')
const child_process = require('child_process')
const [needUpdate] = process.argv.slice(2)

class UpEcc {
  constructor(){
    this.init()
  }
  
  init(){
    // console.log('needUpdate',needUpdate)
    needUpdate == 1 && this.updateEcc()
    this.killAndRestart()
  }
  
  updateEcc(){
    let res = child_process.execSync(`service nginx stop && sudo  ~/.acme.sh/acme.sh --renew -d meamoe.one --force --ecc && service nginx start`)
    console.log('updateEcc',res.toString())
  }

  async killAndRestart(){
    let list = {
      // '/home/vscode/code-server-4.0.1-linux-amd64 --cert /home/crt/mea.crt':`nohup  /home/vscode/code-server-4.0.1-linux-amd64/bin/code-server --cert /home/crt/mea.crt --cert-key /home/crt/mea.key --host meamoe.ml --port 8444 --extensions-dir /home/learn/extensions > /home/vscode/one.log 2>&1 &`
      // 'fuck':'fuck'
      'gotty':`cd /root && nohup gotty -p 8666   --tls  -w  --tls-crt  /home/crt/meaone.crt --tls-key /home/crt/meaone.key -c root:1103874618 bash  >./gotty.log 2>&1 &`,
      'ttyd':`/root/ttyd.i686 -p 8688  -w  --ssl  --ssl-cert /root/.acme.sh/meamoe.one_ecc/meamoe.one.cer --ssl-key /root/.acme.sh/meamoe.one_ecc/meamoe.one.key -c root:1103874618 bash `
    }
    let restartCode = []
    let pidList = this.getPid(list,restartCode)
    console.log('pidList',pidList)
    console.log('restartCode',restartCode)
    pidList.forEach((e,i)=>{
      process.kill(e)
    })
    restartCode.forEach(e=>{
      child_process.exec(e)
    })
    this.restartAria()
  }
  
  async restartAria(){
    child_process.exec(`cd /home/learn/koa/lexue/script && ./restartAria2.sh`)
  }

  getPid(list,restartCode){
    let pidList = []
    for(var le in list ){
      let res = child_process.execSync(`ps -ef | grep '${le}'`)
      let bf = res.toString()
      let reg = /\d{4,5}/
      let proceList = bf.split('\n')
      
      for(var e of proceList){
        console.log('e',e)
        let idList = reg.exec(e)
        console.log('idList',idList)
        if(idList && e.search(`grep`) == -1){
          pidList.push(idList[0])
          restartCode.push(list[le])
          break
        }
      }
    }
    // console.log('pid',pidList)
    return pidList
    // list.forEach((e)=>{
      
    //   // console.log(res.toString())
    // })
    
  }
}

let ue = new UpEcc()
