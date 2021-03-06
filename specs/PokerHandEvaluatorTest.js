var assert = require("assert");
var evaluator = require("../client/game/PokerHandEvaluator");
var Card = require("../client/game/Card");
var Suits = require("../client/game/Suits");
var Ranks = require("../client/game/Ranks");

describe("PokerHandEvaluator", function() {

  it("should return no duplicate rank", function() {
    var card = new Card(Suits.CLUBS, Ranks.SEVEN);
    var hand = [new Card(Suits.HEARTS, Ranks.ACE), new Card(Suits.SPADES,
    Ranks.THREE), new Card(Suits.DIAMONDS, Ranks.TEN)];
    assert.strictEqual(false, evaluator.isDuplicateRank(card, hand));
  });

  it("should return zero two of a kind", function() {
    var twoPairs = evaluator.howManyOfKind(2, [new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.THREE), new Card(Suits.DIAMONDS, Ranks.TEN)]);
    assert.strictEqual(0, twoPairs.length);
  });

  it("should return one two of a kind", function() {
    var twoPairs = evaluator.howManyOfKind(2, [new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.THREE), new Card(Suits.DIAMONDS, Ranks.ACE)]);
    assert.strictEqual(1, twoPairs.length);
  });

  it("should return two two of a kind", function() {
    var twoPairs = evaluator.howManyOfKind(2, [new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.ACE), new Card(Suits.DIAMONDS, Ranks.THREE), new
    Card(Suits.CLUBS, Ranks.THREE)]);
    assert.strictEqual(2, twoPairs[1].length);
  });

  it("should return zero three of a kind", function() {
    var threeOfAKinds = evaluator.howManyOfKind(3, [new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.THREE), new Card(Suits.DIAMONDS, Ranks.TEN)]);
    assert.strictEqual(0, threeOfAKinds.length);
  });

  it("should return one three of a kind", function() {
    var threeOfAKinds = evaluator.howManyOfKind(3, [new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.ACE), new Card(Suits.DIAMONDS, Ranks.ACE), new
    Card(Suits.CLUBS, Ranks.THREE)]);
    assert.strictEqual(3, threeOfAKinds[0].length);
  });

  it("should return two three of a kinds", function() {
    var threeOfAKinds = evaluator.howManyOfKind(3, [new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.ACE), new Card(Suits.DIAMONDS, Ranks.ACE), new
    Card(Suits.DIAMONDS, Ranks.FOUR), new Card(Suits.HEARTS, Ranks.FOUR), new
    Card(Suits.CLUBS, Ranks.FOUR)]);
    assert.strictEqual(2, threeOfAKinds.length);
  });

  it("should return no straight", function() {
    var straight = evaluator.straight([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.ACE), new Card(Suits.DIAMONDS, Ranks.ACE), new
    Card(Suits.DIAMONDS, Ranks.FOUR), new Card(Suits.HEARTS, Ranks.FOUR), new
    Card(Suits.CLUBS, Ranks.FOUR)]);
    assert.strictEqual(0, straight.length);
  });

  it("should return straight", function() {
    var straight = evaluator.straight([new Card(Suits.HEARTS, Ranks.TWO),
    new Card(Suits.SPADES, Ranks.THREE), new Card(Suits.DIAMONDS, Ranks.FOUR), new
    Card(Suits.DIAMONDS, Ranks.FIVE), new Card(Suits.HEARTS, Ranks.SIX), new
    Card(Suits.CLUBS, Ranks.TEN)]);
    assert.strictEqual(5, straight.length);
  });

  it("should return low-card straight", function() {
    var straight = evaluator.straight([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.TWO), new Card(Suits.DIAMONDS, Ranks.THREE), new
    Card(Suits.DIAMONDS, Ranks.FOUR), new Card(Suits.HEARTS, Ranks.FIVE), new
    Card(Suits.CLUBS, Ranks.EIGHT)]);
    assert.strictEqual(5, straight.length);
  });

  it("should return straight excluding duplicates", function() {
    var straight = evaluator.straight([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.TWO), new Card(Suits.DIAMONDS, Ranks.THREE), new
    Card(Suits.DIAMONDS, Ranks.FOUR), new Card(Suits.HEARTS, Ranks.FIVE), new
    Card(Suits.CLUBS, Ranks.FIVE)]);
    assert.strictEqual(5, straight.length);
  });

  it("should return no flush", function() {
    var flush = evaluator.flush([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.TWO), new Card(Suits.DIAMONDS, Ranks.THREE), new
    Card(Suits.DIAMONDS, Ranks.FOUR), new Card(Suits.HEARTS, Ranks.FIVE), new
    Card(Suits.CLUBS, Ranks.FIVE)]);
    assert.strictEqual(0, flush.length);
  });

  it("should return flush", function() {
    var flush = evaluator.flush([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.HEARTS, Ranks.TWO), new Card(Suits.HEARTS, Ranks.THREE), new
    Card(Suits.HEARTS, Ranks.FOUR), new Card(Suits.HEARTS, Ranks.FIVE), new
    Card(Suits.CLUBS, Ranks.FIVE)]);
    assert.strictEqual(5, flush.length);
  });

  it("should return flush excluding duplicates", function() {
    var flush = evaluator.flush([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.HEARTS, Ranks.TWO), new Card(Suits.HEARTS, Ranks.THREE), new
    Card(Suits.HEARTS, Ranks.FOUR), new Card(Suits.HEARTS, Ranks.FIVE), new
    Card(Suits.HEARTS, Ranks.FIVE)]);
    assert.strictEqual(5, flush.length);
  });

  it("should return no full house", function() {
    var fullHouse = evaluator.fullHouse([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.HEARTS, Ranks.ACE), new Card(Suits.HEARTS, Ranks.THREE), new
    Card(Suits.HEARTS, Ranks.THREE), new Card(Suits.HEARTS, Ranks.FOUR), new
    Card(Suits.HEARTS, Ranks.FIVE)]);
    assert.strictEqual(0, fullHouse.length);
  });

  it("should return full house", function() {
    var fullHouse = evaluator.fullHouse([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.HEARTS, Ranks.ACE), new Card(Suits.HEARTS, Ranks.THREE), new
    Card(Suits.HEARTS, Ranks.THREE), new Card(Suits.HEARTS, Ranks.THREE), new
    Card(Suits.HEARTS, Ranks.FIVE)]);
    assert.strictEqual(5, fullHouse.length);
  });

  it("should return no four of a kind", function() {
    var fourOfAKinds = evaluator.howManyOfKind(4, [new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.ACE), new Card(Suits.DIAMONDS, Ranks.ACE), new
    Card(Suits.CLUBS, Ranks.THREE)]);
    assert.strictEqual(0, fourOfAKinds.length);
  });

  it("should return one four of a kind", function() {
    var fourOfAKinds = evaluator.howManyOfKind(4, [new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.ACE), new Card(Suits.DIAMONDS, Ranks.ACE), new
    Card(Suits.CLUBS, Ranks.THREE), new Card(Suits.DIAMONDS, Ranks.ACE)]);
    assert.strictEqual(4, fourOfAKinds[0].length);
  });

  it("should return no straight flush", function() {
    var straightFlush = evaluator.straightFlush([new Card(Suits.HEARTS, Ranks.ACE),
    new Card(Suits.SPADES, Ranks.ACE), new Card(Suits.DIAMONDS, Ranks.ACE), new
    Card(Suits.CLUBS, Ranks.THREE), new Card(Suits.DIAMONDS, Ranks.ACE)]);
    assert.strictEqual(0, straightFlush.length);
  });

  it("should return straight flush", function() {
    var straightFlush = evaluator.straightFlush([new Card(Suits.HEARTS, Ranks.SEVEN),
    new Card(Suits.HEARTS, Ranks.EIGHT), new Card(Suits.HEARTS, Ranks.NINE), new
    Card(Suits.HEARTS, Ranks.TEN), new Card(Suits.HEARTS, Ranks.JACK)]);
    assert.strictEqual(5, straightFlush.length);
  });

  it("should return no royal flush", function() {
    var royalFlush = evaluator.royalFlush([new Card(Suits.HEARTS, Ranks.SEVEN),
    new Card(Suits.HEARTS, Ranks.EIGHT), new Card(Suits.HEARTS, Ranks.NINE), new
    Card(Suits.HEARTS, Ranks.TEN), new Card(Suits.HEARTS, Ranks.JACK)]);
    assert.strictEqual(0, royalFlush.length);
  });

  it("should return royal flush", function() {
    var royalFlush = evaluator.royalFlush([new Card(Suits.HEARTS, Ranks.TEN),
    new Card(Suits.HEARTS, Ranks.JACK), new Card(Suits.HEARTS, Ranks.QUEEN), new
    Card(Suits.HEARTS, Ranks.KING), new Card(Suits.HEARTS, Ranks.ACE), new
    Card(Suits.DIAMONDS, Ranks.THREE)]);
    assert.strictEqual(5, royalFlush.length);
  });

  it("should return high card", function() {
    var highCard = evaluator.highCard([new Card(Suits.HEARTS, Ranks.TWO),
    new Card(Suits.SPADES, Ranks.TWO), new Card(Suits.DIAMONDS, Ranks.THREE), new
    Card(Suits.DIAMONDS, Ranks.FOUR), new Card(Suits.HEARTS, Ranks.JACK), new
    Card(Suits.CLUBS, Ranks.FIVE)])
    assert.strictEqual(Ranks.JACK, highCard.rank);
    assert.strictEqual(Suits.HEARTS, highCard.suit);
  });



});
