/**
 * グラフ構造を表現するためのクラス。
 * @param {[string, string[]]} _value - ひらがな文字列とそのローマ字パターンの配列を要素とする配列
 * @param {Node} _next - 次のnodeを示す
 */
class Node {
    constructor(value, next) {
        this._value = value;
        this._next = next;
    }

    set value(value) {
        this._value = value;
    }
    set next(next) {
        this._next = next;
    }

    get value() {
        return this._value;
    }
    get next() {
        return this._next;
    }
}

export default Node;
