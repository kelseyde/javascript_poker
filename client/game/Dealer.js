var Deck = require("./Deck");
var Player = require("./Player");

var Dealer = function() {
  this.deck = new Deck();
}

Dealer.prototype.drawCard = function() {
  return this.deck.deck.shift();
}

Dealer.prototype.dealCard = function(player) {
  var card = this.drawCard();
  player.hand.push(card);
}

Dealer.prototype.dealTable = function(table, numberOfCards) {
  for (var i = 0; i < numberOfCards; i++) {
    var card = this.drawCard();
    table.push(card);
  }
}

Dealer.prototype.deal = function(players, cardsPerPlayer) {
  players.forEach(function(player) {
    for (var i = 0; i < cardsPerPlayer; i++) {
      this.dealCard(player);
    }
  }.bind(this));
}

module.exports = Dealer;
