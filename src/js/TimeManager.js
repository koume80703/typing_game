class TimeManager {
    /**
     * @type {number}
     */
    _baseTime;
    _elapsedTime;
    _timerId;
    _callback;

    constructor() {
        this._baseTime = Date.now();
    }

    start(callback) {
        this._callback = callback;

        this._timerId = setInterval(() => {
            this._elapsedTime = Date.now() - this._baseTime;
            this._timeUpdateNotify();
        }, 10);
    }

    stop() {
        clearInterval(this._timerId);
    }

    _timeUpdateNotify() {
        if (this._callback) {
            this._callback(this.formattedTime);
        }
    }

    /**
     * @returns {string}
     */
    get formattedTime() {
        const milliTime = this._elapsedTime;
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
}

export default TimeManager;
