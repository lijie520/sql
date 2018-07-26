// SQL语句
var user = {

    getUser: 'SELECT id, name, age, sex, phone, username,email FROM user WHERE id=?',
    userAll: 'SELECT id, name, age, sex,  phone, username,email FROM user',
    registerUser: 'insert into user(id, username, password, name , age, sex, phone, email) values(0, ?, ?, ?, ?, ?, ?, ?)',
    loginUser:'SELECT * FROM user WHERE username =? AND password=?',
    changeUser:'UPDATE user SET name = ?,age = ?, sex = ?, phone = ?, email = ? WHERE id = ?'

};

module.exports = user;
