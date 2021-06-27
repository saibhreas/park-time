Covers rebuilt changes only. 

parks-out
Had multiple Heroku deployment issues. This is th latest Repository build. Clearing JSON and JSON pakcage lock, as well as GET / pathing issues.

the following is the heroku error *2021-06-24T00:38:01.599311+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=parkoutjctest.herokuapp.com request_id=6cea1f10-8188-4134-a61d-4c6e879a418b fwd="173.54.171.158" dyno= connect= service= status=503 bytes= protocol=https

2021-06-24T00:38:01.831121+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/favicon.ico" host=parkoutjctest.herokuapp.com request_id=9bc56d90-638d-4f67-a265-e09ee28373ae fwd="173.54.171.158" dyno= connect= service= status=503 bytes= protocol=https Code H10. did npm i and npm install dotenv. if this does not help then I will refactor code into clean files.

screenshot

Reloade .env npm to no avial. it says its lodaded but cannot get past node. I deleted and re-entered ""start": "node server.js". did a clean start/ rewrote connections file.

Heroku Failure:
Not changing things, minor refactor. checked locally.

runs local inspect yields 200 for GET on all 12 elements of the page Request URL: http://localhost:3001/where2go Request Method: GET Status Code: 200 OK Remote Address: [::1]:3001 Referrer Policy: strict-origin-when-cross-origin HTTP/1.1 200 OK X-Powered-By: Express Accept-Ranges: bytes Cache-Control: public, max-age=0 Last-Modified: Thu, 24 Jun 2021 02:57:04 GMT ETag: W/"1508-17a3bf31499" Content-Type: text/html; charset=UTF-8 Content-Length: 5384 Date: Thu, 24 Jun 2021 04:30:18 GMT Connection: keep-alive Keep-Alive: timeout=5
Pick park api call from page has 200 for GET Request URL: https://developer.nps.gov/api/v1/parks?stateCode=NJ&api_key=aKdQbl5YRDOdOcAzaiDfbacSBby5NQWEU8s5Mi5D Request Method: GET Status Code: 200 OK Remote Address: 3.94.35.204:443 Referrer Policy: strict-origin-when-cross-origin

console logs fucntion including: GET /where2go completes GET's for api weather call pushing.

Pushed-- misleading
Build Log # ID 06625dfa-06bd-4aba-85f0-24856a3bb221

-----> Build succeeded! -----> Discovering process types Procfile declares types -> (none) Default types for buildpack -> web -----> Compressing... Done: 38.6M -----> Launching... Released v11 https://parkout.herokuapp.com/ deployed to Heroku

I received this earlier in the evening. the app still fails with teh same npm GET / failure.