var db = require('../database');
var question = {
  getAllquestions: function(callback) {
    return db.query('select * from question', callback);
  },
  getquestionByid: function(question_id, callback) {
    return db.query(
      'select * from question where id=?',
      [question_id],
      callback
    );
  },

  getAlloptions: function(question_id, callback) {
    return db.query(
      'select answer_options.id, answer_option, questionFK from question inner join answer_options on question.id = answer_options.questionFK where question.id = ?',
      [question_id],
      callback
    );
  },

  getResults: function(question_id, callback) {
    return db.query(
      'select user_answer, userFK from question inner join answers on question.id = answers.question where question.id = ?',
      [question_id],
      callback
    );
  },

  addquestion: function(questions, callback) {
    return db.query(
      'insert into question values(?,?,?)',
      [questions.id, questions.question, questions.surveyFK],
      callback
    );
  },
  deletequestion: function(question_id, callback) {
    return db.query('delete from question where id=?', [question_id], callback);
  },
  updatequestion: function(question_id, questions, callback) {
    return db.query(
      'update question set question=?, surveyFK=? where id=?',
      [questions.question, questions.surveyFK, question_id],
      callback
    );
  },
    getMaxId: function(callback) {
        return db.query('select MAX(id) as maxId from question', callback);
    }
};
module.exports = question;
