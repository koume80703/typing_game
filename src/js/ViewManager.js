class ViewManager {
    _elements;

    constructor() {
        const startElem = document.getElementById("start");
        const sentenceElem = document.getElementById("sentence");
        const kanjiElem = document.getElementById("kanji");
        const romanStrElem = document.getElementById("romanStr");
        const totalTypeNumElem = document.getElementById("totalTypeNum");
        const validTypeNumElem = document.getElementById("validTypeNum");
        const validRateElem = document.getElementById("validRate");
        const timerElem = document.getElementById("timer");

        this._elements = {
            start: startElem,
            sentence: sentenceElem,
            kanji: kanjiElem,
            romanStr: romanStrElem,
            totalTypeNum: totalTypeNumElem,
            validTypeNum: validTypeNumElem,
            validRate: validRateElem,
            timer: timerElem,
        };
    }

    display() {
        let keyContentList = null;
        if (arguments.length == 2) {
            const key = arguments[0];
            const value = arguments[1];
            keyContentList = [{ [key]: value }];
        } else if (arguments.length == 1) {
            keyContentList = arguments[0];
        }

        for (const pair of keyContentList) {
            const key = Object.keys(pair)[0];
            const content = Object.values(pair)[0];
            this._elements[key].textContent = content;
        }
        return;
    }
}

export default ViewManager;
