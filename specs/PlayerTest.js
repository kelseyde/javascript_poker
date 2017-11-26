var assert = require("assert");
var Player = require("../client/game/Player");

describe("Player", function() {

  var player;

  beforeEach(function() {
    player = new Player("Dan");
  });

  it("should have a name", function() {
    assert.strictEqual("Dan", player.name);
  });

  it("should start with an empty hand", function() {
    assert.strictEqual(0, player.hand.length);
  });

  it("should start with 100 chips", function() {
    assert.strictEqual(100, player.chips);
  });

});
