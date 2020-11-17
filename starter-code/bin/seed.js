const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

mongoose.connect('mongodb://localhost/starter-code', {
  useNewUrlParser: true
});

const celebrities = [
  {
    name: "Hackerman",
    occupation: "IT consultant",
    catchPhrase: "This is relevant to my interest"
  },
  {
    name: "Kanye West",
    occupation: "General loudmouth with occasionally good rhythmn",
    catchPhrase: "I'm gonna let you finish"
  },
  {
    name: "R2D2",
    occupation: "Droid extraordinaire ",
    catchPhrase: "Beep boop"
  },
];

Celebrity.insertMany(celebrities)
  .then(data => {
    console.log(`Success! ${data.length} celebs added to the collection`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });