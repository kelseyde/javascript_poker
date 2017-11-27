var assert = require("assert");
var Card = require("../client/game/Card");
var Suits = require("../client/game/Suits");
var Ranks = require("../client/game/Ranks");

describe("Card", function() {

  var card;

  beforeEach(function() {
    card = new Card(Suits.HEARTS, Ranks.ACE);
  });

  it("should have a suit", function() {
    assert.strictEqual(card.suit, Suits.HEARTS);
  });

  it("should have a rank", function() {
    assert.strictEqual(card.rank, Ranks.ACE);
  });

});
