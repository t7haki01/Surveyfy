var db = require('../database');
var answer_option = {
  getAllanswer_options: function(callback) {
    return db.query('select * from answer_options', callback);
  },
  getanswer_optionByid: function(answer_option_id, callback) {
    return db.query(
      'select * from answer_options where id=?',
      [answer_option_id],
      callback
    );
  },
  getanswer_optionByQuestion: function(question, callback) {
    return db.query(
      'select answer_option as answer from answer_options where questionFK=?',
      [question],
      callback
    );
  },
  addanswer_option: function(answer_options, callback) {
    return db.query(
      'insert into answer_options values(?,?,?)',
      [
        answer_options.id,
        answer_options.answer_option,
        answer_options.questionFK
      ],
      callback
    );
  },
  deleteanswer_option: function(answer_option_id, callback) {
    return db.query(
      'delete from answer_options where id=?',
      [answer_option_id],
      callback
    );
  },

  updateanswer_option: function(answer_option_id, answer_options, callback) {
    return db.query(
      'update answer_options set answer_option=?, questionFK=? where id=?',
      [
        answer_options.answer_option,
        answer_options.questionFK,
        answer_option_id
      ],
      callback
    );
  },
  getMaxId: function(callback) {
    return db.query('select MAX(id) as maxId from answer_options', callback);
  }
};
module.exports = answer_option;
