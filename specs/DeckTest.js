var assert = require("assert");
var Deck = require("../client/game/Deck");

describe("Deck", function() {

  var deck;

  beforeEach(function() {
    deck = new Deck();
  });

  it("should have a size", function() {
    assert.strictEqual(52, deck.size());
  });

  it("should be able to remove a card", function() {
    var initialSize = deck.size();
    deck.remove(0);
    assert.strictEqual(deck.size(), initialSize - 1);
  });

  it("should remove the correct card", function() {
    var initialFirstCard = deck.get(0);
    deck.remove(0);
    assert.notEqual(deck.get(0), initialFirstCard);
  });

  it("should be able to shuffle", function() {
    var initialFirstCard = deck.get(0);
    deck.shuffle();
    assert.notEqual(deck.get(0), initialFirstCard);
  });

  it("should be able to clear", function() {
    deck.clear();
    assert.strictEqual(0, deck.size());
  });

});
