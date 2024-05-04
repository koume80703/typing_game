/**
 * nCrの組み合わせを列挙するメソッド
 * @param {number} n 
 * @param {number} r 
 * @returns number[][] - 全ての組み合わせパターンの配列
 */

function combination(n, r) {
    if (n < r) {
        throw Error("引数nがrよりも小さくなっています。");
    }
    if (n <= 0 || r <= 0) {
        throw Error("引数nが負もしくは引数rが負です。");
    }

    const makeNumList = (len) => {
        let numList = [];
        for (let i = 0; i < len; i++) {
            numList.push(i);
        }
        return numList;
    }

    return combRecursion(makeNumList(n), r);
}

/**
 * 組み合わせを列挙するメソッド。<numList.length>個の要素からr個取り出す組み合わせ
 * @param {number[]} numList - 数列を格納した配列
 * @param {number} r - nCrのrにあたる。
 * @returns number[][] - すべての組み合わせパターン
 */

function combRecursion(numList, r) {
    if (r == 1) {
        let arr = [];
        numList.forEach(num => {
            arr.push([num]);
        })
        return arr;
    }
    let result = [];
    numList.forEach((num, i) => {
        let rest = combRecursion(numList.slice(i + 1), r - 1);
        rest.forEach((val) => {
            result.push([num].concat(val));
        })
    })

    return result;
}