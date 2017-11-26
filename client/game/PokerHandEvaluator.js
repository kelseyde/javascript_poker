var Suits = require("./Suits");
var Ranks = require("./Ranks");

var PokerHandEvaluator = {

  setUpRankCounter: function() {
    var rankCounter = {};
    for (var rank in Ranks) {
      rankCounter[rank] = Ranks[rank];
    }
    return rankCounter;
  },

  setUpSuitCounter: function() {
    var suitCounter = {};
    for (var suit in Suits) {
      suitCounter[suit] = suit;
    }
    return suitCounter;
  }

}

module.exports = PokerHandEvaluator;
