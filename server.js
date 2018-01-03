// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const rp = require('request-promise-native');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.get("/", function (request, response) {
  var options = {
    uri: 'http://api.wordnik.com/v4/words.json/randomWords?includePartOfSpeech=noun&excludePartOfSpeech=proper-noun&excludePartOfSpeech=noun-plural&excludePartOfSpeech=proper-noun-plural&excludePartOfSpeech=proper-noun-possesive&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=2&maxDictionaryCount=-1&minLength=0&maxLength=-1&api_key='+process.env.YOUR_WORDNIK_API_KEY,
    // here are the parameters in that super-long string above
    // "includePartOfSpeech": "noun" => 
    //  "excludePartOfSpeech":"noun-plural" => you can chain these as above
    //  "minCorpusCount" : "10000", => a higher number means it appears more often in our corpus so it is more common
    //  "maxCorpusCount" : "-1", => set to -1 so there is no maximum
    //  "minDictionaryCount":"2" => word found in at least two dictionary sources
    //  "maxDictionaryCount":"-1", => => set to -1 so there is no maximum
   //   "minLength": "0", => no minimum length
   //   "maxLength":"=-1", => no maximum length
   //   "api_key": process.env.YOUR_WORDNIK_API_KEY => your key, put in .env file 

    json: true // Automatically parses the JSON string in the response
  };
  //the options 
  rp(options)
    .then(function (randomWord) {
        console.log("here's the random word:" + JSON.stringify(randomWord))
        var results = randomWord.find(function (word) { return /[a-z]/.test(word.word[0]) });
        response.send(results.word);
    })
    .catch(function (err) {
       console.log(err.message);
    });
  
});




  
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
