var assert = require("assert");
var Dealer = require("../client/game/Dealer");
var Player = require("../client/game/Player");

describe("Dealer", function() {

  var dealer;
  var player;

  beforeEach(function() {
    dealer = new Dealer();
    player = new Player();
  });

  it("should start with a deck", function() {
    assert.strictEqual(52, dealer.deck.size());
  });

  it("should be able to deal", function() {
    dealer.deal([player], 1);
    assert.strictEqual(1, player.hand.length);
  });

});
