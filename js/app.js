// 앱 시작점입니다. HTML 요소를 찾고 게임을 실행합니다.
document.addEventListener("DOMContentLoaded", () => {
  PuzzleGame.init({
    boardElement: document.querySelector("#board"),
    messageElement: document.querySelector("#message"),
    tryCountText: document.querySelector("#try-count"),
    matchCountText: document.querySelector("#match-count"),
    timerText: document.querySelector("#timer"),
    resetButton: document.querySelector("#reset-button")
  });
});
