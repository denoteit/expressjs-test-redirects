(function() {

  var baseHref = location.href,
      testInput    = document.getElementById('test-input'),
      testButton    = document.getElementById('test-button'),
      testResponse = document.getElementById('test-response')

  testButton.addEventListener('click', async function(){
    try {
      const data = await postData(`${baseHref}api/follow-url`, { url: testInput.value })
      testResponse.innerHTML = JSON.stringify(data, null, 4)
    } catch (error) {
      console.error(error)
      testResponse.innerHTML = error
    }
    
    async function postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        referrer: 'no-referrer',
        body: JSON.stringify(data)
      })
      return await response.json()
    }
    
  })
})()