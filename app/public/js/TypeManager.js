import convertHiraganaToRoman from "./convert.js";

import { fetchWordsList } from "./jsonFetch.js";
let wordsList;
fetchWordsList()
    .then((data) => {
        wordsList = data;
    })
    .catch((error) => {
        console.error(error);
    });

class TypeManager {
    /**
     * @type {string}
     */
    _sentence;
    /**
     * @type {string}
     */
    _kanji;
    /**
     * @type {[{[s:string] : string[]}]}
     */
    _romanLegalPatternList;
    /**
     * @type {string}
     */
    _nextUnit;
    /**
     * @type {string[]}
     */
    _validPatterns;
    /**
     * @type {string}
     */
    _currentKey;
    /**
     * @type {string[]}
     */
    _typeLog;
    /**
     * @type {string[]}
     */
    _validTypeLog;
    /**
     * @type {string[]}
     */
    _invalidTypeLog;

    /**
     * 現在のひらがな文において正しく入力されたローマ字
     * @type {string[]}
     */
    _typedStrLog;

    constructor() {
        this._sentence = null;
        this._romanLegalPatternList = null;

        this._nextUnit = null;
        this._validPatterns = null;

        this._currentKey = null;

        this._typeLog = [];
        this._validTypeLog = [];
        this._invalidTypeLog = [];

        this._typedStrLog = [];
    }

    initSentence() {
        this._updateSentence();
    }

    /**
     * TypeManagerインスタンスの内部構造を更新する。
     * 具体的にはcurrentKeyの値に応じてその他の情報を更新する。
     */
    update() {
        if (this._isCorrectInput()) {
            this._validTypeLog.push(this._currentKey);
            this._typedStrLog.push(this._currentKey);

            this._updateValidPatterns();

            if (this._validPatterns.some((pattern) => pattern === "")) {
                if (this._romanLegalPatternList.length == 0) {
                    this._updateSentence();
                } else {
                    this._updateNextUnit();
                }
            }

            return;
        }

        this._invalidTypeLog.push(this._currentKey);
    }

    _updateSentence() {
        this._typedStrLog = [];

        const rnd = Math.floor(Math.random() * wordsList.length);
        this._sentence = wordsList[rnd].hiragana;
        this._kanji = wordsList[rnd].kanji;

        this._romanLegalPatternList = convertHiraganaToRoman(this._sentence);
        this._updateNextUnit();
    }
    /**
     * ひらがな単位に対応するローマ字パターンを更新する。
     */
    _updateValidPatterns() {
        const updatePatternsList = [];
        this._validPatterns.forEach((pattern) => {
            const HEAD_INDEX = 0;
            const headChar = pattern.charAt(HEAD_INDEX);
            if (this._currentKey === headChar) {
                updatePatternsList.push(pattern.substring(HEAD_INDEX + 1));
            }
        });
        this._validPatterns = updatePatternsList;
    }

    /**
     * ひらがな単位の更新
     * romanParseにて分割された最大3文字のひらがな文字列をひらがな単位と呼んでいる。
     *
     * TODO// ここでsentenceを更新し、入力済み文字列をsentenceから除去したい。
     */
    _updateNextUnit() {
        const nextUnitValidPatterns = this._romanLegalPatternList.shift();
        this._nextUnit = Object.keys(nextUnitValidPatterns)[0];
        this._validPatterns = Object.values(nextUnitValidPatterns)[0];
    }

    /**
     * 入力キーの正誤を判定する。
     * @returns {boolean} - 入力されたキーが正しければtrue, 誤りであればfalseを返す。
     */
    _isCorrectInput() {
        const validKeySet = new Set(
            this._validPatterns.map((pattern) => {
                return pattern.charAt(0);
            })
        );

        if (!validKeySet.has(this._currentKey)) {
            return false;
        }
        return true;
    }

    /**
     * ローマ字での入力パターンの1つを返す。
     * @returns {string}
     */
    get romanSample() {
        let str = "";
        str += this._validPatterns[0];

        for (const pat of this._romanLegalPatternList) {
            const HIRAGANA_KEY = Object.keys(pat)[0];
            const FIRST_ELEMENT = 0;
            str += pat[HIRAGANA_KEY][FIRST_ELEMENT];
        }
        return str;
    }
    get typedStr() {
        let str = "";
        this._typedStrLog.forEach((ch) => {
            str += ch;
        });
        return str;
    }
    get sentence() {
        return this._sentence;
    }
    get kanji() {
        return this._kanji;
    }
    get typeCount() {
        return this._typeLog.length;
    }
    get validTypeCount() {
        return this._validTypeLog.length;
    }
    get validRate() {
        const DECIMAL_PLACES = 100;
        if (this.typeCount === 0) {
            return 0;
        }
        return (
            Math.round(
                (this.validTypeCount * 100 * DECIMAL_PLACES) / this.typeCount
            ) / DECIMAL_PLACES
        );
    }

    /**
     * @param {string} keyCode
     */
    set currentKey(keyCode) {
        this._currentKey = keyCode;
        this._typeLog.push(this._currentKey);
    }

    /**
     * @returns {string}
     */
    get currentKey() {
        return this._currentKey;
    }
}

export default TypeManager;
