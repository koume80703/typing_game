import DAG from "./DAG.js";
import { fetchWordsList } from "./jsonFetch.js";

let wordsList;
fetchWordsList()
    .then((data) => {
        wordsList = data;
        console.log("wordsList:", wordsList);
    })
    .catch((error) => {
        console.error(error);
    });

let inGame = false;

window.onload = function () {
    // 初期設定
};

window.addEventListener("keydown", pushedKeyDown);
function pushedKeyDown(event) {
    let keyCode = event.key;
    console.log("keyCode = " + keyCode);

    if (!inGame) {
        if (keyCode == "Enter" || keyCode == " ") {
            gameStarted();
        }
    }
}

function gameStarted() {
    inGame = true;
    document.getElementById("start").textContent = "ゲーム中";

    const rnd = Math.floor(Math.random() * wordsList.length);
    const word = wordsList[rnd].hiragana;

    const dag = new DAG(word);

    const romanStr = dag.romanStr;

    document.getElementById("word").textContent = word;
    document.getElementById("romanWord").textContent = romanStr;

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
