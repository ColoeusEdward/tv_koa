module.exports = {}
module.exports.hostProd = `192.168.100.3`
module.exports.host = `127.0.0.1`
module.exports.port = `503`
module.exports.unitId = `1`
module.exports.timeSpan = 500    //采集周期
module.exports.numOrder = 3412   //组码顺序
module.exports.wsPort=3100
module.exports.serverPort=3200
module.exports.dataAddress0 = {
  '02':'meter', //从0开始, 长度2个寄存器(4个字节)
  '22':'speed',
  '42':'hotLine',
  '62':'coldLine',
  '82':'capa',
}

module.exports.dataAddress100 = {
  '22':'condLine', 
}
module.exports.dataAddress200 = {//从200开始,
  '02':'coldLineSet',
  '22':'coldLineHigh',
  '42':'coldLineLow',
  '62':'hotLineSet',
  '82':'hotLineHigh',
  '102':'hotLineLow',
  '122':'capaSet',
  '142':'capaHigh',
  '162':'capaLow',
}

module.exports.nameMap = {
  meter:'米数',
  speed:'速度',
  hotLine:'热线径',
  coldLine:'冷线径',
  capa:'电容',
  coldLineSet:'冷线径设定',
  coldLineHigh:'冷线径上限',
  coldLineLow:'冷线径下限',
  hotLineSet:'热线径设定',
  hotLineHigh:'热线径上限',
  hotLineLow:'热线径下限',
  capaSet:'电容设定',
  capaHigh:'电容上限',
  capaLow:'电容下限',
  condLine:'导体线径'
}

