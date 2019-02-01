const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    const p = path.join(rootDir, "data", "products.json");
    fs.readFile(p, (err, data) => {
      let products = [];
      if (!err) {
        products = JSON.parse(data);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(rootDir, "data", "products.json");
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
