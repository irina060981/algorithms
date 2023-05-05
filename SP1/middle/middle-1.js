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

function printResultFinal(result) {
    console.log(result)
}

async function doSolution() {
    const _input = await readInput()
    const _formattedInput = _input[0].trim().split(' ');

    const a = Number(_formattedInput[0]);
    const x = Number(_formattedInput[1]);
    const b = Number(_formattedInput[2]);
    const c = Number(_formattedInput[3]);

    let result = a*x*x+b*x+c

    printResultFinal(result);
}
doSolution();