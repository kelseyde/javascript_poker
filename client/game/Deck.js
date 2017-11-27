var Suits = require("./Suits");
var Ranks = require("./Ranks");
var Card = require('./Card');

var Deck = function() {
  this.newDeck();
  this.shuffle();
}

Deck.prototype.newDeck = function() {
  this.deck = [];
  for (suit in Suits) {
    for (rank in Ranks) {
      this.deck.push(new Card(suit, rank));
    }
  }
}

Deck.prototype.shuffle = function() {
  this.deck.sort(function(a, b) {
    return 0.5 - Math.random();
  });
}

Deck.prototype.remove = function(index) {
  this.deck.splice(index, 1);
}

Deck.prototype.clear = function() {
  this.deck = [];
}

Deck.prototype.get = function(index) {
  return this.deck[index];
}

Deck.prototype.size = function() {
  return this.deck.length;
}

module.exports = Deck;
