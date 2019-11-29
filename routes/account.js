var express = require('express');
var router = express.Router();
var accounts = require('../models/account');

router.get('/maxId', function(req, res, next) {
  accounts.getMaxId(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/getid/:username?', function(req, res, next) {
  accounts.getidByaccount(req.params.username, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/:account_id?', function(req, res, next) {
  if (req.params.account_id) {
    accounts.getaccountByid(req.params.account_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    accounts.getAllaccounts(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.post('/', function(req, res, next) {
  accounts.addaccount(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});

router.post('/registration', function(req, res, next) {
  accounts.registration(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});

router.delete('/:account_id', function(req, res, next) {
  accounts.deleteaccount(req.params.account_id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:account_id', function(req, res, next) {
  accounts.updateaccount(req.params.account_id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
