import TypeManager from "./TypeManager.js";
import TimeManager from "./TimeManager.js";
import ViewManager from "./ViewManager.js";

class GameManager {
    /**
     * @type {boolean}
     */
    _isInGame;
    /**
     * @type {TypeManager}
     */
    _typeManager;
    /**
     * @type {TimeManager}
     */
    _timeManager;
    /**
     * @type {ViewManager}
     */
    _viewManager;

    constructor() {
        this._isInGame = false;
        this._typeManager = new TypeManager();
        this._viewManager = new ViewManager();
    }

    pushedKeyDown(event) {
        this._typeManager.currentKey = event.key;

        console.log("keyCode =", this._typeManager.currentKey);
        if (!this._isInGame) {
            if (["Enter", " "].includes(this._typeManager.currentKey)) {
                this._start();
            }
            return;
        }
        if (this._typeManager.currentKey == "Escape") {
            this._stop();
            return;
        }

        this._typeManager.update();

        this._viewUpdate();
    }

    _start() {
        this._isInGame = true;
        this._typeManager = new TypeManager();

        this._viewManager.display([{ start: "ゲーム中" }]);

        this._typeManager.initSentence();

        this._viewUpdate();
        this._startTimer();
    }

    _stop() {
        this._isInGame = false;

        this._viewReset();
        this._timeManager.stop();
    }

    _viewReset() {
        const keyContentList = [
            { start: "ゲーム開始はSpaceまたはEneter" },
            { sentence: "" },
            { kanji: "" },
            { romanStr: "" },
            { totalTypeNum: "0" },
            { validTypeNum: "0" },
            { correctRate: "0" },
        ];

        this._viewManager.display(keyContentList);
    }

    _viewUpdate() {
        const keyContentList = [
            { sentence: this._typeManager.sentence },
            { kanji: this._typeManager.kanji },
            { romanStr: this._typeManager.romanSample },
            { totalTypeNum: this._typeManager.typeCount },
            { validTypeNum: this._typeManager.validTypeCount },
            { correctRate: this._typeManager.correctRate },
        ];
        this._viewManager.display(keyContentList);
    }

    _startTimer() {
        this._timeManager = new TimeManager();

        this._timeManager.start((time) => {
            this._viewManager.display([{ timer: time }]);
        });
    }

    _stopTimer() {
        this._timeManager.stop();
    }
}

export default GameManager;
