import wordsListJSON from "./json/wordsList.json" assert {type: "json"}
import DAG from "./DAG.js"

const wordsList = wordsListJSON;

let inGame = false;

window.onload = function () {
    // 初期設定
}

window.addEventListener("keydown", pushKeydown);
function pushKeydown(event) {
    let keyCode = event.key;
    console.log("keyCode = " + keyCode);

    if (!inGame) {
        if (keyCode == "Enter" || keyCode == " ") {
            gameStarted();
        }
    }

    else {
        if (isCollectKey(keyCode)) {

        }
    }
}

function gameStarted() {
    inGame = true;
    document.getElementById("start").textContent = "ゲーム中"

    const dag = new DAG();

    const rnd = Math.floor(Math.random() * (wordsList.length));
    const word = wordsList[rnd].hiragana;

    dag.romanParse(word);

    document.getElementById("word").textContent = word;

    startTimer();
}

function startTimer() {
    const startedTime = Date.now();

    let timer = document.getElementById("timer");
    timer.textContent = timeFormat(0);

    updateTimer();

    function updateTimer() {
        const timerId = setTimeout(() => {
            if (!inGame) {
                clearTimeout(timerId);
                return;
            }

            let passedTime = Date.now() - startedTime;

            timer.textContent = timeFormat(passedTime);
            updateTimer();
        }, 10)
    }
}

function timeFormat(milliTime) {
    const sec = Math.floor(milliTime / 1000 % 60);
    const min = Math.floor(milliTime / 1000 / 60);
    const hour = Math.floor(milliTime / 1000 / 60 / 60);
    const day = Math.floor(milliTime / 1000 / 60 / 60 / 24);

    return ("0" + hour).slice(-2) + ":" + ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2) + ":" + ("" + Math.floor((milliTime / 10))).slice(-2);
};

function isCollectKey(keyCode) {
    return false;
}

