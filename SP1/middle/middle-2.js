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

function printResult(result) {
    console.log(result)
}

async function doSolution() {
    const _input = await readInput()
    const _formattedInput = _input[0].trim().split(' ');

    const a = Number(_formattedInput[0]);
    const b = Number(_formattedInput[1]);
    const c = Number(_formattedInput[2]);

    let chetRes1 = a % 2
    if (chetRes1 < 0) chetRes1 = (-1)*chetRes1
    let chetRes2 = b % 2
    if (chetRes2 < 0) chetRes2 = (-1)*chetRes2
    let chetRes3 = c % 2
    if (chetRes3 < 0) chetRes3 = (-1)*chetRes3
    
    let midChetRes = chetRes1 + chetRes2 + chetRes3


    const result = ((midChetRes === 3)||(midChetRes === 0)) ? 'WIN' : 'FAIL'
    printResult(result);
}
doSolution();