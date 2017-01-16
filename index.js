var express = require("express");
var alexa = require("alexa-app");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.port;
var REST_PORT =  5100;
var SEVER_IP_ADDR = process.env.OPENSHIFT_NODEJS_IP || process.env.HEROKU_IP ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

var alexaApp = new alexa.app("test");
alexaApp.launch(function(request, response) {
  response.say("You launched the app!");
});

alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent("nameIntent", {
    "slots": { "NAME": "LITERAL" },
    "utterances": [
      "my {name is|name's} {names|NAME}", "set my name to {names|NAME}"
    ]
  },
  function(request, response) {
    response.say("Success!");
  }
);

alexaApp.express(app, "/echo/");

app.listen(process.env.port || process.env.PORT || 3978,SEVER_IP_ADDR);
console.log("Listening on port " + REST_PORT + ", try http://localhost:" + REST_PORT + "/echo/test");
