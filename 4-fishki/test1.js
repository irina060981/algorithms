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
    if (result.length === 0) {
        console.log('None')
        return
    }
    console.log(result.join(' '))
}

async function doSolution() {
    const _input = await readInput()

    const n = Number(_input[0]);
    const values = _input[1].trim().split(' ').map(val => Number(val))
    values.sort(function (a,b) { return a-b });
    const k = Number(_input[2]);

    let result = []
    let i = 0
    let j = n

    while ((i!==j) && (result.length === 0)) {
        if ((values[i] + values[j]) === k) {
            result.push(values[i]);
            result.push(values[j]);
        } else if ((values[i] + values[j]) < k) {
            i = i+1;
        } else {
            j = j-1;
        }
    }


    printResult(result);
}
doSolution();