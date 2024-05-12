import GameManager from "./GameManager.js";

let gameManager;
window.onload = function () {
    // 初期設定
    gameManager = new GameManager();
};

window.addEventListener("keydown", (event) => {
    gameManager.pushedKeyDown(event);
});
