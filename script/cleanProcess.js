const child_process = require('child_process')
const process = require('process')
const useCleanProcess = (params) => {
  
  const getPid = (list,restartCode)=>{
    let pidList = []
    for(var le in list ){
      let res = child_process.execSync(`ps -ef | grep '${le}'`)
      let bf = res.toString()
      let reg = /\d{4,5}/
      let proceList = bf.split('\n')
      let pList = proceList.filter(e=>{
        return e.search(`grep`) == -1
      })
      pList.pop()
      console.log('pList',pList)
      
      for(var e of pList){
        // console.log('e',e)
        let idList = reg.exec(e)
        // console.log('idList',idList)
        if(e.search(`grep`) == -1){
          idList[0] && pidList.push(idList[0])
          if(!idList[0]){
            console.log(idList)
          }
          // restartCode.push(list[le])
          // break
        }
      }
    }
    console.log('pid',pidList)
    return pidList
  }

  const killProcess = (pidList)=>{
    pidList.forEach((e,i)=>{
      process.kill(e)
    })
  }
  return {
    getPid
    ,killProcess
  }
}
// let clean = useCleanProcess()
// let list=  clean.getPid({'sh /home/learn/koa/mihoyo-signin/auto.sh':`sh /home/learn/koa/mihoyo-signin/auto.sh`})
// clean.killProcess(list)
module.exports = useCleanProcess