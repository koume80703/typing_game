import romanPatternJSON from "./json/romanTypingParseDictionary.json" assert {type: "json"}

const romanPattern = romanPatternJSON;
console.log("romanPattern = ", romanPattern);

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

            for (const h in hiragana) {
                let breakDownPattern = [];
                let parsedHiragana = h;

                function combination(valueNum, chooseNum) {

                }
            }
        }
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