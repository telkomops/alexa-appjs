var express = require("express");
var alexa = require("alexa-app");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.port;

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

app.listen(PORT);
console.log("Listening on port " + PORT + ", try http://localhost:" + PORT + "/echo/test");
