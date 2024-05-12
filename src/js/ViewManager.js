class ViewManager {
    _elements;

    constructor() {
        const startElem = document.getElementById("start");
        const sentenceElem = document.getElementById("sentence");
        const kanjiElem = document.getElementById("kanji");
        const romanStrElem = document.getElementById("romanStr");
        const totalTypeNumElem = document.getElementById("totalTypeNum");
        const validTypeNumElem = document.getElementById("validTypeNum");
        const correctRateElem = document.getElementById("correctRate");
        const timerElem = document.getElementById("timer");

        this._elements = {
            start: startElem,
            sentence: sentenceElem,
            kanji: kanjiElem,
            romanStr: romanStrElem,
            totalTypeNum: totalTypeNumElem,
            validTypeNum: validTypeNumElem,
            correctRate: correctRateElem,
            timer: timerElem,
        };
    }

    display(keyContentList) {
        for (const pair of keyContentList) {
            const key = Object.keys(pair)[0];
            const content = Object.values(pair)[0];
            this._elements[key].textContent = content;
        }
    }
}

export default ViewManager;