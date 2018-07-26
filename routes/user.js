const express = require('express');
const router = express.Router();
const userdto =  require('../dto/user');


// 查询用户列表全部
router.get('/getUserList', function(req, res, next) {
    userdto.getUserList(req, res, next); // 用户列表
});
router.get('/getUser', function(req, res, next) {
    userdto.getUser(req, res, next); // 用户列表
});
router.post('/register', function(req, res, next) {
  userdto.register(req, res, next); // 用户信息
});
router.post('/changeUser', function(req, res, next) {
  userdto.changeUser(req, res, next); // 修改用户信息
});

router.post('/login', function(req, res, next) {
  userdto.getLogin(req, res, next); // 用户信息
});
router.get('/logout', function(req, res, next) {
  userdto.getLogout(req, res, next); // 登出
});
module.exports = router;
