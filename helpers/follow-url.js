var http = require('http'); 
var https = require('https'); 
var url = require('url');

async function followUrl (_url, _host = null, _trace = null) {

  if (_trace === null) {
    _trace = []
  }

  return new Promise(async (resolve, reject) => {
    var httpProtocol = (_url.startsWith('https:')) ? https : http;
    httpProtocol.get(_url, async function (res) {
  
      if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
          let redirectUrl
          _trace.push({
            statusCode: res.statusCode,
            url: _url,
            redirectUrl: res.headers.location
          })
          if (url.parse(res.headers.location).hostname) {
            redirectUrl = res.headers.location
          } else {
            // @TODO Hostname not included; get host from requested URL (url.parse()) and prepend to location.
          }
          await followUrl(redirectUrl, null, _trace)
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