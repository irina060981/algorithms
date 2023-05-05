const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

function readNumber(_curLine) {
    return Number(_inputLines[_curLine]);
}

function solve() {
    const a = readNumber(0);
    const b = readNumber(1);
    console.log(a + b);
}