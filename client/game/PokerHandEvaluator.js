var Suits = require("./Suits");
var Ranks = require("./Ranks");

var PokerHandEvaluator = {

  setUpSuitCounter: function(hand) {
    var suitCounter = {};
    for (var suit in Suits) {
      suitCounter[suit] = 0;
    }
    return suitCounter;
  },

  setUpRankCounter: function() {
    var rankCounter = {};
    for (var i = 1; i < 14; i++) {
      rankCounter[i] = 0;
    }
    return rankCounter;
  },

  setUpRoyalRankCounter: function() {
    var royalRankCounter = {};
    for (var i = 9; i< 14; i++) {
      royalRankCounter[i] = 0;
    }
    return royalRankCounter;
  },

  isDuplicateRank: function(card, hand) {
    var isDuplicate = false;
    for (handCard of hand) {
      if (card.rank === handCard.rank) {
        isDuplicate = true;
      }
    }
    return isDuplicate;
  },

  highCard: function(hand) {
    return hand.sort(function(a, b) {
      return b.rank - a.rank;
    })[0];
  },

  howManyOfKind: function(howMany, hand) {
    var kindCounter = [];
    var rankCounter = this.setUpRankCounter();
    for (var card of hand) { rankCounter[card.rank] += 1 }
    Object.keys(rankCounter).forEach(function(key) {
      var cardCount = rankCounter[key];
      if (cardCount === howMany) {
        var kindArray = [];
        hand.forEach(function(card) {
          if (card.rank === parseInt(key)) {
            kindArray.push(card);
          }
        });
        kindCounter.push(kindArray);
      }
    });
    return kindCounter;
  },

  straight: function(hand) {
    var _this = this;
    var straight = [];
    var rankCounter = this.setUpRankCounter();
    for (var card of hand) { rankCounter[card.rank] += 1 }
    for (var i = 1; i < 10; i++) {
      if (rankCounter[i] > 0 &&
          rankCounter[i + 1] > 0 &&
          rankCounter[i + 2] > 0 &&
          rankCounter[i + 3] > 0 &&
          rankCounter[i + 4] > 0) {
            hand.forEach(function(card) {
              if (card.rank === i ||
                  card.rank === i + 1 ||
                  card.rank === i + 2 ||
                  card.rank === i + 3 ||
                  card.rank === i + 4 &&
                  !_this.isDuplicateRank(card, straight)) {
                      straight.push(card);
              }
            });
      }
    }
    if (rankCounter[13] > 0 &&
        rankCounter[1] > 0 &&
        rankCounter[2] > 0 &&
        rankCounter[3] > 0 &&
        rankCounter[4] > 0) {
          hand.forEach(function(card) {
            if (card.rank === 13 ||
                card.rank === 1 ||
                card.rank === 2 ||
                card.rank === 3 ||
                card.rank === 4 &&
                !_this.isDuplicateRank(card, straight)) {
                  straight.push(card);
            }
          });
    }
    return straight;
  },

  flush: function(hand) {
    var _this = this;
    var flush = [];
    var suitCounter = this.setUpSuitCounter();
    for (var card of hand) { suitCounter[card.suit] += 1 }
    for (suit in Suits) {
      if (suitCounter[suit] >= 5) {
        flush = hand.filter(function(card) {
          return card.suit === suit;
        }).sort(function(a, b) {
          return a.rank - b.rank;
        });
      }
    }
    if (flush.length > 5) { flush.pop() }
    return flush;
  },

  fullHouse: function(hand) {
    var fullHouse = [];
    var handCopy = hand;
    var threeOfAKinds = this.howManyOfKind(3, handCopy);
    for (var threeOfAKind of threeOfAKinds) {
      if (threeOfAKind.length > 0) {
        for (var card of threeOfAKind) {
          var indexInHand = handCopy.indexOf(card);
          handCopy.splice(indexInHand, 1);
        }
        var twoOfAKinds = this.howManyOfKind(2, handCopy);
        if (twoOfAKinds.length > 0) {
          fullHouse = threeOfAKind.concat(twoOfAKinds[0]);
        }
      }
    }
    return fullHouse;
  },

  straightFlush: function(hand) {
    var straightFlush = [];
    var flush = this.flush(hand);
    if (flush.length === 0) return straightFlush;
    straightFlush = this.straight(flush);
    return straightFlush;
  },

  royalFlush: function(hand) {
    var _this = this;
    var royalFlush = [];
    var flush = this.flush(hand);
    if (flush.length === 0) return royalFlush;
    var rankCounter = this.setUpRoyalRankCounter();
    for (var card of hand) { rankCounter[card.rank] += 1 }
    if (rankCounter[Ranks.TEN] > 0 &&
        rankCounter[Ranks.JACK] > 0 &&
        rankCounter[Ranks.QUEEN] > 0 &&
        rankCounter[Ranks.KING] > 0 &&
        rankCounter[Ranks.ACE] > 0) {
          royalFlush = hand.filter(function(card) {
            return card.rank === Ranks.TEN ||
                   card.rank === Ranks.JACK ||
                   card.rank === Ranks.QUEEN ||
                   card.rank === Ranks.KING ||
                   card.rank === Ranks.ACE &&
                   _this.isDuplicateRank(card, hand);
          });
        }
    return royalFlush
  },

  isThisManyOfKind: function(howMany, hand) {
    return this.howManyOfKind(howMany, hand).length !== 0;
  },

  isTwoPair: function(howMany, hand) {
    return this.howManyOfKind(howMany, hand).length === 2;
  }

  isStraight: function(hand) {
    return this.straight(hand).length !== 0;
  },

  isFlush: function(hand) {
    return this.flush(hand).length !== 0;
  },

  isFullHouse: function(hand) {
    return this.fullHouse(hand).length !== 0;
  },

  isStraightFlush: function(hand) {
    return this.straightFlush(hand).length !== 0;
  },

  isRoyalFlush: function(hand) {
    return this.royalFlush(hand).length !== 0;
  },

  evaluateHand: function(hand) {
    if (this.isRoyalFlush(hand)) return 10;
    if (this.isStraightFlush(hand)) return 9;
    if (this.isThisManyOfKind(4, hand)) return 8;
    if (this.isFullHouse(hand)) return 7;
    if (this.isFlush(hand)) return 6;
    if (this.isStraight(hand)) return 5;
    if (this.isThisManyOfKind(3, hand)) return 4;
    if (this.isThisManyOfKind(2, hand)) return 3;
    if (this.isTwoPair(hand)) return 2;
    return 1;
  },

  getHandWithHighCard: function(hands) {
    var highScore, winner;
    for (var hand of hands) {
      var score = this.highCard(hand).rank;
      if (score > highScore) {
        highScore = score;
        winner = hand;
      }
    }
    return winner;
  }





}

module.exports = PokerHandEvaluator;
