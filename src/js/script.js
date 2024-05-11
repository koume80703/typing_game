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
    typeManager = new TypeManager();
};

window.addEventListener("keydown", pushedKeyDown);
function pushedKeyDown(event) {
    typeManager.currentKey = event.key;

    console.log("keyCode =", typeManager.currentKey);

    if (!isInGame) {
        if (["Enter", " "].includes(typeManager.currentKey)) {
            gameStarted();
        }
        return;
    }
    if (typeManager.currentKey == "Escape") {
        gameStopped();
        return;
    }

    typeManager.update();

    elementUpdate();
}

function gameStarted() {
    isInGame = true;
    typeManager = new TypeManager();

    document.getElementById("start").textContent = "ゲーム中";

    typeManager.initSentence();

    elementUpdate();

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

function elementUpdate() {
    const sentence = typeManager.sentence;
    const kanji = typeManager.kanji;
    const romanStr = typeManager.romanSample;

    document.getElementById("sentence").textContent = sentence;
    document.getElementById("kanji").textContent = kanji;
    document.getElementById("romanStr").textContent = romanStr;
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
