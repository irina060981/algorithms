function solve() {    const countCommands = readInt();
    const lengthDek = readInt();    const listCommand = readArray();
    const dek = new Dek(lengthDek);
    for (let i = 0; i < listCommand.length ; i += 1) {     const arrlist = listCommand[i]?.split(" ");
     if (arrlist.length === 1) {        const [method] = arrlist;
        dekmethod     } else {
        const method, value] = arrlist;        dek[method
     }   }
}
function readInt() {    const n = Number(_inputLines[_curLine]);
    _curLine++;    return n;
}
function readArray() {    var arr = _inputLines.slice(_curLine);
    _curLine++;    return arr;
}