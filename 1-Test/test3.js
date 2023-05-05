const _fs = require('node:fs');
const _readline = require('node:readline');

const _fileStream = _fs.createReadStream('input-task1.txt');

const _reader = _readline.createInterface({
    input: _fileStream,
    crlfDelay: Infinity
});

const _inputLines = [];
let _curLine = 0;

function readNumber() {
    return Number(_inputLines[_curLine++]);
}

function solve() {
    const a = readNumber();
    const b = readNumber();

    const answer = a + b;

    console.log(answer);
}

async function processLineByLine() {
    for await (const line of _reader) {
      _inputLines.push(line);
    }
    solve()
}

processLineByLine()