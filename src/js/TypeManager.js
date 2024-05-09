import convertHiraganaToRoman from "./convert.js";

class TypeManager {
    /**
     * @type {string}
     */
    _sentence;
    /**
     * @type {[Dictionary{string : string[]}]}
     */
    _romanLegalPatternList;
    /**
     * @type {Dictionary{string : string[]}}
     */
    _nextLegalPattern;
    /**
     * @type {number}
     */
    _typeCount;
    /**
     * @type {string[]}
     */
    _typeLog;

    constructor() {
        this._sentence = null;
        this._romanLegalPatternList = null;

        this._typeCount = 0;
        this._typeLog = [];
    }

    isCollectInput(keyCode) {}

    /**
     * ローマ字での入力パターンの1つを返す。
     * @returns {string}
     */
    get romanSample() {
        let str = "";

        for (const pat of this._romanLegalPatternList) {
            const HIRAGANA_KEY = Object.keys(pat)[0];
            const FIRST_ELEMENT = 0;
            str += pat[HIRAGANA_KEY][FIRST_ELEMENT];
        }
        return str;
    }

    /**
     * フィールドsentenceへの代入と同時にローマ字入力パターンの生成を行う。
     * @param {string} sentence
     */
    set sentence(sentence) {
        this._sentence = sentence;
        this._romanLegalPatternList = convertHiraganaToRoman(sentence);
    }
}

export default TypeManager;
