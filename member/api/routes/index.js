var express = require('express');
var router = express.Router();
var mongo = require("mongodb-curd");//引入mongodb-curd

const db = "1701B";//库名
const col = "user";//集合名

/* 增加 */
router.post('/api/addUser', function (req, res, next) {
  //get//地址栏传参
  //post //请求头 安全高，大小理论上无限制

  let obj = req.body; //取到前端传过来的数据信息（对象形式）
  if(obj.name && obj.age && obj.sex && obj.adress && obj.iphone){//必须传入的数据判断
    mongo.insert(db, col,obj,function (result) {
      if (!result) {
        res.send({
          code: 0,
          msg: "添加失败！"
        })
      } else {
        res.send({
          code: 1,
          msg: "添加成功了！"
        })
      }
    })
  }else{
     //没有值得情况
    res.send({code:3,msg:"缺少参数！"})
  }
});


//查询所有成员信息
router.post('/api/getUser', function (req, res, next) {
  mongo.find(db, col,{}, function (result) {
    if (!result) {
      res.json({
        code: 0,
        msg: "查询失败了！"
      })
    } else {
      res.json({
        code: 1,
        msg: "查询成功!",
        data: result //数据
      })
    }
  })
});


//根据具体的信息查询
router.post('/api/getUserOne', function (req, res, next) {
   /**
   * 
   * mongodb-curd
   * 执行对数据库的操作
   * post=>body
   * get => query
   * 
   */
  let id = req.body.id;//
  console.log(name)
  mongo.find(db, col, {"_id":id}, function (result) {
    if (!result) {
      res.json({
        code: 0,
        mes: "error"
      })
    } else {
      res.json({
        code: 1,
        mes: "success",
        data: result
      })
    }
  })
});

router.post('/api/getUpdate', function (req, res, next) {
  /**
   * 
   * mongodb-curd
   * 执行对数据库的操作
   * post=>body
   * get => query
   * 
   */
  let updateObj = req.body; //{"name":"zhangsan"}
  let id = updateObj.id;
  delete updateObj.id;
 

   mongo.update(db,col,[{"_id":id},updateObj],function(result){
      if(!result){
        res.json({code:0,msg:"更改失败"})
      }else{
        res.json({code:1,msg:"更改成功"})
      }

   })

})


router.post('/api/deleteUser', function (req, res, next) {
  /**
   * 
   * mongodb-curd
   * 执行对数据库的操作
   * post=>body
   * get => query
   * 
   */
  let id = req.body.id;
   mongo.remove(db,col,{"_id":id},function(result){
      if(!result){
        res.json({code:0,msg:"删除失败"})
      }else{
        res.json({code:1,msg:"删除成功"})
      }

   })

})











module.exports = router;
