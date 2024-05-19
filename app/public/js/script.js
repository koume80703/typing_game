import GameManager from "./GameManager.js";
import { GameMode } from "./GameManager.js";

let gameManager;
window.onload = function () {
    // 初期設定
    const resParam = new URLSearchParams(window.location.search);
    const mode = resParam.get("mode");

    gameManager = new GameManager(mode);
};

window.addEventListener("keydown", (event) => {
    gameManager.pushedKeyDown(event);
});
