import { fetchWordsList } from "./jsonFetch.js";
import TypeManager from "./TypeManager.js";

let wordsList;
fetchWordsList()
    .then((data) => {
        wordsList = data;
    })
    .catch((error) => {
        console.error(error);
    });

let isInGame = false;

/**
 * @type {TypeManager}
 */
let typeManager;

window.onload = function () {
    // 初期設定
};

window.addEventListener("keydown", pushedKeyDown);
function pushedKeyDown(event) {
    const keyCode = event.key;
    console.log("keyCode = " + keyCode);

    if (!isInGame) {
        if (keyCode == "Enter" || keyCode == " ") {
            gameStarted();
        }
        return;
    }
    if (keyCode == "Escape") {
        gameStopped();
        return;
    }
}

function gameStarted() {
    isInGame = true;
    typeManager = new TypeManager();

    document.getElementById("start").textContent = "ゲーム中";

    const rnd = Math.floor(Math.random() * wordsList.length);
    const sentence = wordsList[rnd].hiragana;
    const kanji = wordsList[rnd].kanji;

    typeManager.sentence = sentence;

    const romanStr = typeManager.romanSample;

    document.getElementById("sentence").textContent = sentence;
    document.getElementById("kanji").textContent = kanji;
    document.getElementById("romanStr").textContent = romanStr;

    startTimer();
}

function gameStopped() {
    isInGame = false;

    document.getElementById("start").textContent =
        "ゲーム開始はSpaceまたはEnter";
    document.getElementById("sentence").textContent = "";
    document.getElementById("kanji").textContent = "";
    document.getElementById("romanStr").textContent = "";
}

function startTimer() {
    const startedTime = Date.now();

    let timer = document.getElementById("timer");
    timer.textContent = timeFormat(0);

    updateTimer();

    function updateTimer() {
        const timerId = setTimeout(() => {
            if (!isInGame) {
                clearTimeout(timerId);
                return;
            }

            let passedTime = Date.now() - startedTime;

            timer.textContent = timeFormat(passedTime);
            updateTimer();
        }, 10);
    }
}

function timeFormat(milliTime) {
    const sec = Math.floor((milliTime / 1000) % 60);
    const min = Math.floor(milliTime / 1000 / 60);
    const hour = Math.floor(milliTime / 1000 / 60 / 60);
    const day = Math.floor(milliTime / 1000 / 60 / 60 / 24);

    return (
        ("0" + hour).slice(-2) +
        ":" +
        ("0" + min).slice(-2) +
        ":" +
        ("0" + sec).slice(-2) +
        ":" +
        ("" + Math.floor(milliTime / 10)).slice(-2)
    );
}
