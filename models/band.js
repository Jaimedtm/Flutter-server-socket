const { v4: uuidv4, v4 } = require("uuid");

class Band {
  constructor(name = "no-name", votes = 0) {
    this.id = uuidv4();
    this.name = name;
    this.votes = votes;
  }
}

module.exports = Band;
