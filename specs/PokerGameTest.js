var assert = require("assert");
var PokerGame = require("../client/game/PokerGame");
var Card = require("../client/game/Card");

describe("PokerGame", function() {

  var game;

  beforeEach(function() {
    game = new PokerGame();
  });

  it("should have an empty array of players", function() {
    assert.strictEqual(0, game.players.length);
  });

  it("should have a table that starts empty", function() {
    assert.strictEqual(0, game.table.length);
  });

  it("should have a pot that starts empty", function() {
    assert.strictEqual(0, game.pot);
  });

  it("should have a current player that starts at null", function() {
    assert.strictEqual(null, game.currentPlayer);
  });


});
