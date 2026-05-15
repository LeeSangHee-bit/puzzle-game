const assert = require("assert");
const fs = require("fs");
const vm = require("vm");

const context = {
  clearInterval,
  setInterval,
  setTimeout
};

vm.createContext(context);
vm.runInContext(`${fs.readFileSync("js/util.js", "utf8")}; this.PuzzleUtil = PuzzleUtil;`, context);
vm.runInContext(`${fs.readFileSync("js/game.js", "utf8")}; this.PuzzleGame = PuzzleGame;`, context);

const game = context.PuzzleGame;

game.elements = {
  tryCountText: { textContent: "" },
  matchCountText: { textContent: "" },
  timerText: { textContent: "" },
  messageElement: { textContent: "" }
};

game.render = () => {};

assert.strictEqual(game.formatTime(180), "3:00");
assert.strictEqual(game.formatTime(59), "0:59");

game.state = game.createInitialState();
assert.strictEqual(game.state.remainingTime, 180);

const cards = game.createCards();
assert.strictEqual(game.fruits.length, 18);
assert.strictEqual(cards.length, 36);

game.state.cards = cards;
cards[0].isFlipped = true;
game.handleTimeOver();
game.handleCardClick(cards[1]);

assert.strictEqual(game.state.isTimeOver, true);
assert.strictEqual(game.state.remainingTime, 0);
assert.strictEqual(cards[0].isFlipped, false);
assert.strictEqual(cards[1].isFlipped, false);
assert.strictEqual(game.elements.timerText.textContent, "0:00");

console.log("game timer tests passed");
