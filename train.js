// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.
const { NlpManager } = require("node-nlp");
const languages = ["fr", "en"];
const manager = new NlpManager({ languages: ["fr", "en"] });
const fs = require("fs");
var path = require('path')
languages.forEach((language) => {
  const files = fs.readdirSync(`./intents/${language}`);
  for (const file of files) {
    let data = fs.readFileSync(`./intents/${language}/${file}`);
    data = JSON.parse(data);
    const questions = data.questions;
    const answers = data.answers;
    const intent = file.replace(".json", "");
    for (const question of questions) {
      manager.addDocument(`${language}`, question, intent);
    }
    for (const answer of answers) {
      try {
        JSON.parse(answer);
        manager.addAnswer(`${language}`, intent, `${answer}`);
      } catch {
        manager.addAnswer(`${language}`, intent, `${answer}`);
      }
    }
  }
});

const train_save = async () => {
  await manager.train();
  manager.save(path.join(__dirname, "datas","model.nlp"));
};

train_save();
/*
// Creating new Instance of NlpManager class.
const manager = new NlpManager({ languages: ["en"] })
// Let's import fs module to read our json files.
const fs = require("fs");
// Let's read all our intents files in the folder intents
const files = fs.readdirSync("./intents");
// Looping through the files and Parsing the string to object and passing it to manager instance to train and process it.
for (const file of files) {
  let data = fs.readFileSync(`./intents/${file}`);
  data = JSON.parse(data);
  const intent = file.replace(".json", "");
  for (const question of data.questions) {
    manager.addDocument("en", question, intent);
  }
  for (const answer of data.answers) {
    manager.addAnswer("en", intent, answer);
  }
}
// let's create a function that will be responsible for Training and saving the manager instance.
async function train_save() {
  await manager.train();
  manager.save();
}
// Calling the above function
train_save();
*/
