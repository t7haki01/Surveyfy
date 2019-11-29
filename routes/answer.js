var express = require('express');
var router = express.Router();
var answers = require('../models/answer');
router.get('/maxId', function(req, res, next) {
  answers.getMaxId(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/question/count/:question?', function(req, res, next) {
  answers.getNumberOfAnswersByQuestion(req.params.question, function(
    err,
    rows
  ) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/survey/count/:surveyFK?', function(req, res, next) {
  answers.getNumberOfAnswersBySurvey(req.params.surveyFK, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/question/:question?', function(req, res, next) {
  if (req.params.question) {
    answers.getanswerByQuestion(req.params.question, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    return err;
  }
});

router.get('/:answer_id?', function(req, res, next) {
  if (req.params.answer_id) {
    answers.getanswerByid(req.params.answer_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    answers.getAllanswers(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.post('/', function(req, res, next) {
  answers.addanswer(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:answer_id', function(req, res, next) {
  answers.deleteanswer(req.params.answer_id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:answer_id', function(req, res, next) {
  answers.updateanswer(req.params.answer_id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
