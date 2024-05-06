const romanPatternURL = "./json/romanTypingParseDictionary.json";

async function fetchRomanPattern() {
    try {
        const responce = await fetch(romanPatternURL);
        const data = await responce.json();
        return data;
    } catch (error) {
        console.error("failed to fetch data:", error);
        throw error;
    }
}

export { fetchRomanPattern };

const wordsListURL = "./json/wordsList.json";

async function fetchWordsList() {
    try {
        const response = await fetch(wordsListURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed to fetch data:", error);
        throw error;
    }
}

export { fetchWordsList };

/*
import fs from "fs";
const romanPattern = JSON.parse(
    fs.readFileSync(
        "/workspaces/typing/src/json/romanTypingParseDictionary.json"
    )
);
const wordsList = JSON.parse(
    fs.readFileSync("/workspaces/typing/src/json/wordsList.json")
);

export { romanPattern, wordsList };
*/
