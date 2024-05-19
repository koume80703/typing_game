import TypeManager from "./TypeManager.js";
import TimeManager from "./TimeManager.js";
import ViewManager from "./ViewManager.js";

class GameMode {
    static NORMAL = Symbol("normal");
    static ENDLESS = Symbol("endless");

    static strToMode(str) {
        switch (str) {
            case "normal":
                return GameMode.NORMAL;
            case "endless":
                return GameMode.ENDLESS;
            default:
                throw new Error("Illegal string argument of strToMode()");
        }
    }
}

export { GameMode };

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
    /**
     * @type {GameMode}
     */
    _gameMode;

    constructor(gameMode) {
        if (gameMode === null) {
            throw new Error("Not selected game mode");
        }
        this._isInGame = false;
        this._gameMode = GameMode.strToMode(gameMode);
        this._typeManager = new TypeManager();
        this._viewManager = new ViewManager();
    }

    pushedKeyDown(event) {
        switch (this._gameMode) {
            case GameMode.NORMAL:
                this._normalGameProcess(event);
                break;
            case GameMode.ENDLESS:
                this._endlessGameProcess(event);
                break;
            default:
                throw new Error("Illegal game mode input");
        }
    }

    _normalGameProcess(event) {
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

    _endlessGameProcess(event) {}

    _start() {
        this._isInGame = true;
        this._typeManager = new TypeManager();

        this._viewManager.display("start", "ゲーム中");

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
            { typedStr: "" },
            { untypedStr: "" },
            { totalTypeNum: "0" },
            { validTypeNum: "0" },
            { validRate: "0" },
        ];

        this._viewManager.display(keyContentList);
    }

    _viewUpdate() {
        const keyContentList = [
            { sentence: this._typeManager.sentence },
            { kanji: this._typeManager.kanji },
            { typedStr: this._typeManager.typedStr },
            { untypedStr: this._typeManager.romanSample },
            { totalTypeNum: this._typeManager.typeCount },
            { validTypeNum: this._typeManager.validTypeCount },
            { validRate: this._typeManager.validRate },
        ];
        this._viewManager.display(keyContentList);
    }

    _startTimer() {
        this._timeManager = new TimeManager();

        this._timeManager.start((time) => {
            this._viewManager.display("timer", time);
        });
    }

    _stopTimer() {
        this._timeManager.stop();
    }
}

export default GameManager;
