var db = require('../database');
var today = new Date();
var user = {
  getAllusers: function(callback) {
    return db.query('select * from user', callback);
  },
  getFKById: function(user_id, callback) {
    return db.query(
      'select accountFK as account_id from user where id=?',
      [user_id],
      callback
    );
  },
  getUserByFK: function(account_id, callback) {
    return db.query(
      'select * from user where accountFK=?',
      [account_id],
      callback
    );
  },
  getuserByid: function(user_id, callback) {
    return db.query('select * from user where id=?', [user_id], callback);
  },
  getFirstnameByAccountId: function(account_id, callback) {
    return db.query(
      'select firstname from user where accountFK=?',
      [account_id],
      callback
    );
  },
  adduser: function(users, callback) {
    return db.query(
      'insert into user values(?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        users.id,
        users.firstname,
        users.lastname,
        users.accountFK,
        users.email,
        users.birthdate,
        users.phone,
        users.streetAddress,
        users.postalCode,
        users.rewards,
        today,
        users.type
      ],
      callback
    );
  },
  deleteuser: function(user_id, callback) {
    return db.query('delete from user where id=?', [user_id], callback);
  },
  updateuser: function(user_id, users, callback) {
    return db.query(
      'update user set firstname=?, lastname=?, accountFK=?, email=?, birthdate=?, phone=?, streetAddress=?, postalCode=?, rewards=?, modifiedDate=?, type=? where id=?',
      [
        users.firstname,
        users.lastname,
        users.accountFK,
        users.email,
        users.birthdate,
        users.phone,
        users.streetAddress,
        users.postalCode,
        users.rewards,
        users.modifiedDate,
        users.type,
        user_id
      ],
      callback
    );
  },
  getMaxId: function(callback) {
    return db.query('select MAX(id) as maxId from user', callback);
  }
};
module.exports = user;
