// For test
// import fs from "fs";
// const romanPattern = JSON.parse(
//     fs.readFileSync(
//         "/workspaces/typing/src/json/romanTypingParseDictionary.json"
//     )
// );
// const romanPatternDict = makeTypePatternDict();

import { fetchRomanPattern } from "./jsonFetch.js";
let romanPattern;
/**
 * @type [{[s:string] : string[]}]
 */
let romanPatternDict;
fetchRomanPattern()
    .then((data) => {
        romanPattern = data;
        romanPatternDict = makeTypePatternDict();
    })
    .catch((error) => {
        console.error(error);
    });

/**
 * ひらがな文字列を受け取り、ローマ字タイピングパターンを返す。
 * ひらがな文字列は最大3文字に分割され、分割されたそれぞれのひらがな文字列のパターンをリストにして戻す。
 * @param {string} sentence
 * @returns [{[s:string] : string[]}]
 */
function convertHiraganaToRoman(sentence) {
    const parsedList = romanParse(sentence);

    const legalRomanPatternList = [];

    for (const parsedValue of parsedList) {
        const hiraganaStr = parsedValue;
        const romanizedList = romanPatternDict[hiraganaStr];

        legalRomanPatternList.push({
            [hiraganaStr]: romanizedList,
        });
    }

    return legalRomanPatternList;
}

export default convertHiraganaToRoman;

function makeTypePatternDict() {
    let rpd = {};
    romanPattern.forEach((element) => {
        rpd[element.Pattern] = element.TypePattern;
    });

    return rpd;
}

/**
 *
 * @param {string} sentence
 * @returns string[]
 */
function romanParse(sentence) {
    let idx = 0;
    let parsedList = [];

    while (idx < sentence.length) {
        const uni = sentence[idx];
        const bi =
            idx + 1 < sentence.length ? sentence.substring(idx, idx + 2) : "";
        const tri =
            idx + 2 < sentence.length ? sentence.substring(idx, idx + 3) : "";

        if (tri in romanPatternDict) {
            idx += 3;
            parsedList.push(tri);
        } else if (bi in romanPatternDict) {
            idx += 2;
            parsedList.push(bi);
        } else if (uni in romanPatternDict) {
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
