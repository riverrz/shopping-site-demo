// const getDb = require("../utils/database").getDb;
// const mongodb = require("mongodb");

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectID(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // update the product
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log("Added/Updated product");
//       })
//       .catch(console.log);
//   }
//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectID(prodId) })
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(console.log);
//   }
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then(products => {
//         return products;
//       })
//       .catch(console.log);
//   }
//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectID(prodId) })
//       .then(res => {
//         console.log("Deleted");
//       })
//       .catch(console.log);
//   }
// }

// module.exports = Product;
