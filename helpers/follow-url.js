var http = require('http'); 
var https = require('https'); 
var url = require('url');

async function followUrl (_url, _host = null, _trace = []) {
  return new Promise(async (resolve, reject) => {
    var httpProtocol = (_url.startsWith('https:')) ? https : http;
    httpProtocol.get(_url, async function (res) {
      if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
          _trace.push({
            statusCode: res.statusCode,
            url: _url,
            redirectUrl: res.headers.location
          })
          await followUrl(res.headers.location, null, _trace)
      } else {
        _trace.push({
          statusCode: res.statusCode,
          url: _url,
          redirectUrl: null
        })
      }
      resolve(_trace)
    }) 
  })
}

module.exports = followUrl