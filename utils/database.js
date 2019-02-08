const mongodb = require("mongodb");
const MongoCLient = mongodb.MongoClient;
const keys = require("../keys/keys");

const mongoConnect = cb => {
  MongoCLient.connect(keys.MONGO_URI)
    .then(client => {
      console.log("Connected");
      cb(client);
    })
    .catch(console.log);
};

module.exports = mongoConnect;
