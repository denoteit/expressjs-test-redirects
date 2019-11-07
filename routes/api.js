var express = require('express');
var router = express.Router();
const { http, https } = require('follow-redirects');

router.get('/', function(req, res, next) {
  res.json({'api':'api is working!'});
});

router.post('/follow-url', function(req, res, next) {
  let url = req.body.url

  http.get(url, response => {
      console.log(response.responseUrl);

      res.json(
      {
        'result':
          {
            'statusCode': response.headers.statusCode,
            'url': response.responseUrl
          }
      });
    }).on('error', err => {
      console.error(err);
    })
});

module.exports = router;
