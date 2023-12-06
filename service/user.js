const {sequelize} = require(__base+'db.js')

const { DataTypes,Op } = require("sequelize");
var Ddd = require(__base+'model/ddd.js')(sequelize, DataTypes);
var User = require(__base+'model/user.js')(sequelize, DataTypes);

// let insertUser = async (user)=>{
//   let result = await knex('user').insert(user)
//   return result
// }

// let selectOne = async (user)=>{
//   let result = await knex('ddd').insert(user)
//   return result
// }

// let selectList = async (user)=>{
//   let result = await knex.select().from('ddd')
//   return result
// }

let findAllDDD = async ()=>{
  try {

    // let dddList = null
    const result = await sequelize.transaction(async (t) => {
  
      let dddList = await Ddd.findAll({ transaction: t });
      
      // await user.setShooter({
      //   firstName: 'John',
      //   lastName: 'Boothe'
      // }, { transaction: t });
      return dddList
      
  
    });
    return result;
  
    // 如果执行到此行,则表示事务已成功提交,`result`是事务返回的结果
    // `result` 就是从事务回调中返回的结果(在这种情况下为 `user`)
  
  } catch (error) {
    console.error(error);
    // 如果执行到此,则发生错误.
    // 该事务已由 Sequelize 自动回滚！
  
  }
  // return Ddd.findAll()
  // console.log();
}

let findAllGroupAge = async ()=>{
  let res =await Ddd.findAll(
    {
      attributes:[
        'age',
        [sequelize.fn('COUNT', sequelize.col('age')), 'nage']
      ],
      group:[
        ['age']
      ]
    }
    
  )
  return res
}

let findMax =  async (data={})=>{
  return await Ddd.max('age')
}


let findOrCreate = async (data={})=>{
  return User.findOrCreate(data)//返回一个ddd对象
}

let insertMulti = async (data=[])=>{
  if(data.length<=1){
    console.error('数据不够多');
    return false
  }
  for await (var e of data){
    Ddd.create(e)
  }
  console.log('over');
}

let updateOne = async (user={})=>{
  let {user_open_id,...info} = user
  return User.update(info, {
    where: {
      user_open_id: user_open_id
    }
  });
}

let findOne  = async (obj)=>{
  return User.findOne(obj);
}
// function testUser(user){
  
// }

let findAll = async (obj)=>{
  return User.findAll({
    where:obj
  });
}

module.exports = {
  findAll,
  // insertOne,
  insertMulti,
  findAllGroupAge,
  findMax,
  findOrCreate,
  updateOne,
  findOne,
};


async function mutiTest(){

}
