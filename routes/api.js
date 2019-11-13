var express = require('express');
var router = express.Router();
var followUrl = require('../helpers/follow-url')

router.get('/', function(req, res, next) {
  res.json({'api':'api is working!'});
});

router.post('/follow-url', async (req, res, next) => {
  try {
    const trace = await followUrl(req.body.url)
    res.json(trace)
  } catch (e) {
    next(e)
  }
});

module.exports = router;
