var db = require('../database');
var survey = {
  getAllsurveys: function(callback) {
    return db.query('select * from survey', callback);
  },

  getSurveysByOwner: function(id, callback) {
    return db.query('select * from survey where owner = ? ', [id], callback);
  },

  getAllquestions: function(survey_id, callback) {
    return db.query(
      'select question, question.id from survey inner join question on survey.id = question.surveyFK where survey.id=?',
      [survey_id],
      callback
    );
  },
  getQuestionsByOwner: function(survey_owner, callback) {
    return db.query(
      'select survey.title, survey.owner ,question.question, question.id from survey inner join question on survey.id = question.surveyFK where survey.owner=?',
      [survey_owner],
      callback
    );
  },

  getsurveyByid: function(survey_id, callback) {
    return db.query('select * from survey where id=?', [survey_id], callback);
  },

  addsurvey: function(surveys, callback) {
    return db.query(
      'insert into survey values(?,?,?)',
      [surveys.id, surveys.title, surveys.owner],
      callback
    );
  },

  deletesurvey: function(survey_id, callback) {
    return db.query('delete from survey where id=?', [survey_id], callback);
  },

  updatesurvey: function(survey_id, surveys, callback) {
    return db.query(
      'update survey set title=?, owner=? where id=?',
      [surveys.title, surveys.owner, survey_id],
      callback
    );
  },
  getMaxId: function(callback) {
    return db.query('select MAX(id) as maxId from survey', callback);
  }
};
module.exports = survey;
