class Directory {
  constructor(name) {
    this.name = name;
    this.children = new Map();
  }
}

module.exports = Directory;
