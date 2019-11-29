var express = require('express');
var router = express.Router();
var questions = require('../models/question');
router.get('/maxId', function(req, res, next){
    questions.getMaxId(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    })
});
router.get('/:question_id?', function(req, res, next) {
  if (req.params.question_id) {
    questions.getquestionByid(req.params.question_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    questions.getAllquestions(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/:question_id?/options/', function(req, res, next) {
  if (req.params.question_id) {
    questions.getAlloptions(req.params.question_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/:question_id?/results/', function(req, res, next) {
  if (req.params.question_id) {
    questions.getResults(req.params.question_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.post('/', function(req, res, next) {
  questions.addquestion(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:question_id', function(req, res, next) {
  questions.deletequestion(req.params.question_id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:question_id', function(req, res, next) {
  questions.updatequestion(req.params.question_id, req.body, function(
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
module.exports = router;
