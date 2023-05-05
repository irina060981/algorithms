const _fs = require('fs');
const _readline = require('readline');

const _fileStream = _fs.createReadStream('input.txt');

const _reader = _readline.createInterface({
    input: _fileStream,
    crlfDelay: Infinity
});

async function readInput() {
    const _input = []
    for await (const line of _reader) {
      _input.push(line);
    }

    return _input;
}

function printBracketsColumn (nBrackets) {
  
}

async function doSolution() {
    const _input = await readInput()

    const nBrackets = Number(_input[0])

    printBracketsColumn(nBrackets)
}
doSolution();
