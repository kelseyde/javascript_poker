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
    var royalRankCounter = {
      JACK: 0,
      QUEEN: 0,
      KING: 0,
      ACE: 0
    };
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
    var highValue = 0;
    var highCard = null;
    for (card of hand) {
      if (card.rank >= highValue) {
        highValue = card.rank;
        highCard = card;
      }
    }
    return highCard;
  },

  howManyOfKind: function(howMany, hand) {
    var kindCounter = [];
    var rankCounter = this.setUpRankCounter();

    hand.forEach(function(card) {
      rankCounter[card.rank] += 1;
    });

    Object.keys(rankCounter).forEach(function(key) {
      var cardCount = rankCounter[key];
      if (cardCount === howMany) {
        var kindArray = [];
        hand.forEach(function(card) {
          if (card.rank === key) {
            kindArray.push(card);
          }
        })
        kindCounter.push(kindArray);
      }
    });

    return kindCounter;
  },

  straight: function(hand) {
    var _this = this;
    var straight = [];
    var rankCounter = this.setUpRankCounter();
    hand.forEach(function(card) {
      rankCounter[card.rank] += 1;
    });

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
    hand.forEach(function(card) {
      suitCounter[card.suit] += 1;
    });

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

  fullHouse: function() {
    var fullHouse = [];
  }
  // public ArrayList<Card> fullHouse(ArrayList<Card> hand) {
  //     ArrayList<Card> fullHouse = new ArrayList<>();
  //
  //     //set up a copy of hand ArrayList, so that elements can be removed w/o removing from hand
  //     ArrayList<Card> workingHand = new ArrayList<>();
  //     for (Card card : hand) {
  //         workingHand.add(card);
  //     }
  //
  //     //gets ArrayList of three-of-a-kind combinations
  //     ArrayList<ArrayList<Card>> threeOfAKinds = howManyOfKind(3, workingHand);
  //     for (ArrayList<Card> threeOfAKind : threeOfAKinds) {
  //         if (!(threeOfAKind.isEmpty())) {
  //             //if there is a three-of-a-kind, remove it from workingHand
  //             workingHand.removeAll(threeOfAKind);
  //             //and check workingHand for two-of-a-kinds
  //             ArrayList<ArrayList<Card>> twoOfAKinds = howManyOfKind(2, workingHand);
  //             //if there is a two-of-a-kind
  //             if (!(twoOfAKinds.isEmpty())) {
  //                 //add two-of-a-kind to fullHouse, along with three-of-a-kind, making full house
  //                 fullHouse.addAll(threeOfAKind);
  //                 fullHouse.addAll(twoOfAKinds.get(0));
  //             }
  //         }
  //     }
  //     return fullHouse;
  // }

}

module.exports = PokerHandEvaluator;
