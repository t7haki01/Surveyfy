var express = require('express');
var router = express.Router();
var surveys = require('../models/survey');
router.get('/maxId', function(req, res, next) {
  surveys.getMaxId(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/owner/:owner?', function(req, res, next) {
  if (req.params.owner) {
    surveys.getSurveysByOwner(req.params.owner, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    surveys.getAllsurveys(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/:survey_id?', function(req, res, next) {
  if (req.params.survey_id) {
    surveys.getsurveyByid(req.params.survey_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    surveys.getAllsurveys(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/:survey_id?/questions/', function(req, res, next) {
  if (req.params.survey_id) {
    surveys.getAllquestions(req.params.survey_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get('/owner/:owner?', function(req, res, next) {
  if (req.params.owner) {
    surveys.getQuestionsByOwner(req.params.owner, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.post('/', function(req, res, next) {
  surveys.addsurvey(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:survey_id', function(req, res, next) {
  surveys.deletesurvey(req.params.survey_id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:survey_id', function(req, res, next) {
  surveys.updatesurvey(req.params.survey_id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
