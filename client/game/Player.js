var Card = require("./Card");

var Player = function(name) {
  this.name = name;
  this.hand = [];
  this.chips = 100;
}

module.exports = Player;
