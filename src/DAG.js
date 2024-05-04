import romanPatternJSON from "./json/romanTypingParseDictionary.json" assert { type: "json" };
import { combination } from "./combination.js";

const romanPattern = romanPatternJSON;
// console.log("romanPattern = ", romanPattern);

class DAG {
    /*
    有向非巡回グラフ(Directed Acyclic Graph)
    */
    #romanPatternDict;
    #head;

    constructor() {
        this.#romanPatternDict = this.makeTypePatternDict();
        this.#head = new Node(null, null);
    }

    makeTypePatternDict() {
        let rpd = {};
        romanPattern.forEach(element => {
            rpd[element.Pattern] = element.TypePattern;
        });

        return rpd;
    }

    generator(sentence) {
        const parsedList = this.romanParse(sentence);

        for (const parsedValue in parsedList) {
            const hiragana = parsedValue;


        }
    }

    separateHiragana(hiragana) {
        // hiraganaに入る文字列の最長は3なので長さ3の文字列を考えると
        // "あいう"という文字列を分けるパターンの生成法は
        // "あ1い2う"という文字の間のセパレータをそれぞれ選択するかどうか
        // 言い換えれば2C2, 2C1のすべてのパターンで組み合わせを列挙し、
        // セパレータの組み合わせごとに文字列を分割する方法を考えた。

        let separetedPattern = [];
        for (let i = 0; i < hiragana.length; i++) {
            separetedPattern = separetedPattern.concat(combination(hiragana.length - 1, i));
        }
        let separatedHiraganaList = [];
        separetedPattern.forEach(pattern => {
            let separated = [];
            // console.log("pattern:", pattern);
            let str = "";
            for (let i = 0; i < hiragana.length; i++) {
                const ch = hiragana.charAt(i);
                str += ch;
                if (pattern.includes(i)) {
                    separated.push(str);
                    str = "";
                }
            }
            if (str != "") {
                separated.push(str);
            }
            separatedHiraganaList.push(separated);
        })

        return separatedHiraganaList;
    }

    romanParse(sentence) {
        /*
        与えられたひらがなの文を最大3文字の単位に分け、各単位をリストとして格納する。
        */
        let idx = 0;
        let parsedList = [];

        while (idx < sentence.length) {
            const uni = sentence[idx];
            const bi = (idx + 1 < sentence.length) ? sentence.substr(idx, 2) : "";
            const tri = (idx + 2 < sentence.length) ? sentence.substr(idx, 3) : "";

            if (tri in this.#romanPatternDict) {
                idx += 3;
                parsedList.push(tri);
            } else if (bi in this.#romanPatternDict) {
                idx += 2;
                parsedList.push(bi);
            } else if (uni in this.#romanPatternDict) {
                idx += 1;
                parsedList.push(uni);
            } else {
                throw new Error(`非対応のひらがなパターンを検知しました。uni:${uni}, bi:${bi}, tri:${tri}`);
            }
        }
        console.log("parsedList: ", parsedList);

        return parsedList;
    }
}
export default DAG;

class Node {
    #value;
    #next;

    constructor(value, next) {
        this.#value = value;
        this.#next = next;
    }
}

