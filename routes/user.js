var express = require('express');
var router = express.Router();
var users = require('../models/user');

router.get('/account/:account_id?', function(req, res, next) {
  if (req.params.account_id) {
    users.getUserByFK(req.params.account_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.get('/:user_id?/account', function(req, res, next) {
  if (req.params.user_id) {
    users.getFKById(req.params.user_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.get('/firstname/:account_id?', function(req, res, next) {
  if (req.params.account_id) {
    users.getFirstnameByAccountId(req.params.account_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});
router.get('/maxId', function(req, res, next) {
  users.getMaxId(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
router.get('/:user_id?', function(req, res, next) {
  if (req.params.user_id) {
    users.getuserByid(req.params.user_id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    users.getAllusers(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.post('/', function(req, res, next) {
  users.adduser(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.delete('/:user_id', function(req, res, next) {
  users.deleteuser(req.params.user_id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put('/:user_id', function(req, res, next) {
  users.updateuser(req.params.user_id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
