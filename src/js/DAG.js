import Node from "./Node.js";
import { fetchRomanPattern } from "./jsonFetch.js";

// For test
// import { romanPattern } from "./jsonFetch.js";

let romanPattern;
fetchRomanPattern()
    .then((data) => {
        romanPattern = data;
        console.log("romanPattern:", romanPattern);
    })
    .catch((error) => {
        console.error(error);
    });

/**
 * 非巡回グラフ
 */
class DAG {
    /**
     * DAGクラスのコンストラクタ。フィールド変数の初期化とDAGの生成を行う。
     * @param {string} sentence - ひらがな文
     */
    constructor(sentence) {
        this._romanPatternDict = this._makeTypePatternDict();
        this._head = null;
        this._generator(sentence);
    }

    /**
     *
     * @returns {Dictionary{string : string[]}} - 最大長3のひらがなを鍵として、そのローマ字入力パターンを列挙する。
     */
    _makeTypePatternDict() {
        let rpd = {};
        romanPattern.forEach((element) => {
            rpd[element.Pattern] = element.TypePattern;
        });

        return rpd;
    }
    /**
     * DAGを生成する
     * @param {String} sentence
     */
    _generator(sentence) {
        const parsedList = this._romanParse(sentence);

        let prevNode = null;

        for (const parsedValue of parsedList) {
            const hiraganaStr = parsedValue;
            const romanizedList = this._romanPatternDict[hiraganaStr];

            const node = new Node([hiraganaStr, romanizedList], null);

            if (this._head === null) {
                this._head = node;
            } else {
                prevNode.next = node;
            }
            prevNode = node;
        }
    }

    /**
     * 与えられたひらがなの文を最大3文字の単位に分け、各単位をリストとして格納する。
     * @param {string} sentence - ひらがな文
     * @returns string[] - ローマ字入力単位の文字列(最大文字列長: 3)
     */
    _romanParse(sentence) {
        let idx = 0;
        let parsedList = [];

        while (idx < sentence.length) {
            const uni = sentence[idx];
            const bi =
                idx + 1 < sentence.length
                    ? sentence.substring(idx, idx + 2)
                    : "";
            const tri =
                idx + 2 < sentence.length
                    ? sentence.substring(idx, idx + 3)
                    : "";

            if (tri in this._romanPatternDict) {
                idx += 3;
                parsedList.push(tri);
            } else if (bi in this._romanPatternDict) {
                idx += 2;
                parsedList.push(bi);
            } else if (uni in this._romanPatternDict) {
                idx += 1;
                parsedList.push(uni);
            } else {
                throw new Error(
                    `非対応のひらがなパターンを検知しました。uni:${uni}, bi:${bi}, tri:${tri}`
                );
            }
        }

        return parsedList;
    }

    get romanStr() {
        let currentNode = this._head;
        let romanStr = "";
        while (currentNode !== null) {
            romanStr += currentNode.value[1][0];
            console.log(currentNode);
            currentNode = currentNode.next;
        }
        return romanStr;
    }

    test() {}
}
export default DAG;
