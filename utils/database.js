const mongodb = require("mongodb");
const MongoCLient = mongodb.MongoClient;
const keys = require("../keys/keys");

let _db;

const mongoConnect = cb => {
  MongoCLient.connect(keys.MONGO_URI)
    .then(client => {
      console.log("Connected");
      _db = client.db();
      cb();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
