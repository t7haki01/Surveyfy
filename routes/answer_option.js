var express = require('express');
var router = express.Router();
var answer_options = require('../models/answer_option');
router.get('/maxId', function(req, res, next) {
  answer_options.getMaxId(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get('/:answer_option_id?', function(req, res, next) {
  if (req.params.answer_option_id) {
    answer_options.getanswer_optionByid(req.params.answer_option_id, function(
      err,
      rows
    ) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    answer_options.getAllanswer_options(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/question/:questionFK?', function(req, res, next) {
  if (req.params.questionFK) {
    answer_options.getanswer_optionByQuestion(req.params.questionFK, function(
      err,
      rows
    ) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    return console.log(err);
  }
});
router.post('/', function(req, res, next) {
  answer_options.addanswer_option(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:answer_option_id', function(req, res, next) {
  answer_options.deleteanswer_option(req.params.answer_option_id, function(
    err,
    count
  ) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:answer_option_id', function(req, res, next) {
  answer_options.updateanswer_option(
    req.params.answer_option_id,
    req.body,
    function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    }
  );
});
module.exports = router;
