var db = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var today = new Date();

//Here setting expired date as 1 year after today which is when signing up date
var expire = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

var account = {
  getAllaccounts: function(callback) {
    return db.query('select * from account', callback);
  },
  getaccountByid: function(account_id, callback) {
    return db.query('select * from account where id=?', [account_id], callback);
  },
  getidByaccount: function(username, callback) {
    return db.query(
      'select id from account where account=?',
      [username],
      callback
    );
  },
  addaccount: function(accounts, callback) {
    return bcrypt.hash(accounts.password, saltRounds, function(err, hash) {
      db.query(
        'insert into account (account, password, isExpired, joinedDate, expireDate, modifiedDate) values(?,?,?,?,?,?)',
        [accounts.account, hash, false, today, expire, today],
        callback
      );
    });
  },
  deleteaccount: function(account_id, callback) {
    return db.query('delete from account where id=?', [account_id], callback);
  },
  updateaccount: function(account_id, accounts, callback) {
      return bcrypt.hash(accounts.password, saltRounds, function(err, hash) {
          return db.query(
              'update account set account=?, password=?, isExpired=?, joinedDate=?, expireDate=?, modifiedDate=? where id=?',
              [
                  accounts.account,
                  // accounts.password,
                  hash,
                  accounts.isExpired,
                  accounts.joinedDate,
                  expire,
                  today,
                  account_id
              ],
              callback
          );
      });
  },
  getMaxId: function(callback) {
    return db.query('select MAX(id) as maxId from account', callback);
  }
};
module.exports = account;
