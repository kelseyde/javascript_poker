var Player = require("./Player");
var Dealer = require("./Dealer");
var PokerHandEvaluator = require("./PokerHandEvaluator");

var PokerGame = function() {
  this.players = [];
  this.currentPlayer = null;
  this.dealer = new Dealer();
  this.evaluator = PokerHandEvaluator;
  this.table = [];
  this.pot = 0;
}

PokerGame.prototype.getCurrentPlayer = function() {
  return this.currentPlayer;
}

PokerGame.prototype.addPlayer = function(player) {
  this.players.push(player);
}

PokerGame.prototype.nextPlayer = function() {
  var numberOfPlayers = this.players.length;
  if (this.players.indexOf(this.currentPlayer) === (numberOfPlayers - 1)) {
    this.currentPlayer = this.players[0];
  } else {
    var newPlayerIndex = this.players.indexOf(currentPlayer);
    this.currentPlayer = this.players[newPlayerIndex];
  }
  return this.currentPlayer;
}

PokerGame.prototype.getPlayerHands = function() {
  var hands = this.players.map(function(player) {
    return player.hand;
  });
  return hands;
}

PokerGame.prototype.combineHandAndTable = function(player) {
  return player.hand.concat(this.table);
}

module.exports = PokerGame;
