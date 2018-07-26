const mysql = require('mysql');
const sqlContent = require('../config/index');
const util = require('../util/index');
const sql = require('../mapper/userMap');
const respone = require('./config');
console.log(respone.respone)
// 使用连接池，提升性能
const pool = mysql.createPool(util.extend({}, sqlContent.mysql));
// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
  console.log(ret,'ret==========================')
    if (typeof ret === 'undefined') {
        res.json({
            code: '-1',
            msg: '后台异常'
        });
    } else {
        res.json(ret);

    }
};
module.exports = {
// 查用户列表
  getUserList: function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query(sql.userAll, function(err, result) {
              let  responeALL = Object.assign( {}, respone.respone)
                   responeALL.list = result
                   responeALL.msg= '成功'
               jsonWrite(res, responeALL);
                connection.release();

            });
    });
},
// 根据id 查 用户
  getUser: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      var param = req.query || req.params;
      var id = param.id;
      connection.query(sql.getUser, [id], function(err, result) {
        console.log(err,'iserr')
        let  responeALL = Object.assign( {}, respone.respone)
        responeALL.data = result[0]
        responeALL.msg= '成功'
        jsonWrite(res, responeALL);
        connection.release();
      });
    })
  },
// 注册
  register:function(req, res, next){
    pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
      var param = req.body

      // 建立连接，向表中插入值
      connection.query(sql.registerUser, [param.username, param.password,param.name, param.age,param.sex, param.phone,param.email], function(err, result) {
          let  responeALL = Object.assign( {}, respone.respone)
           responeALL.msg= '注册成功'
           responeALL.list = null
          // 以json形式，把操作结果返回给前台页面
          jsonWrite(res, responeALL);
          // 释放连接
          connection.release();
      });
  });
},
// 登录
getLogin:function(req, res, next){
  pool.getConnection(function(err, connection) {
      // 获取前台页面传过来的参数
        var param = req.body;
        connection.query(sql.loginUser, [param.username, param.password], function(err, result) {
          console.log(result,'----------------------')
            let  responeALL =Object.assign( {}, respone.respone)
          if(result.length< 1){
             responeALL.msg= '登录失败,账户名或密码错误'
             responeALL.code='9999'
             responeALL.list = null
             console.log(err, 'error')
              jsonWrite(res, responeALL);
          }else {
            responeALL.msg= `登录成功,欢迎你${result[0].name}`
            delete result[0].password
            responeALL.data =  result[0]
             jsonWrite(res, responeALL);
          }
            connection.release();
        });
    });
},
// 修改用户信息
changeUser:function(req, res, next){
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
      let  responeALL = Object.assign( {}, respone.respone)
    var param = req.body
    if(param.id == ''){
         responeALL.code='9999'
         responeALL.msg = 'id不能为空'
    return  jsonWrite(res, responeALL);
  }

    // 建立连接，向表中插入值
    connection.query(sql.changeUser, [param.name, param.age,param.sex, param.phone,param.email,param.id ],
        function(err, result) {
         responeALL.msg= '修改成功'
         responeALL.list = null
        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, responeALL);
        // 释放连接
        connection.release();
    });
});
},


getLogout: function(req, res, next) {
  let  responeALL = Object.assign( {}, respone.respone)
      responeALL.list = []
      responeALL.msg= '登出成功'
      jsonWrite(res, responeALL);
},


}
