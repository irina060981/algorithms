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
    const values = _input[1].trim().split(' ');
    const k = Number(_input[2]);

    let result = []

    for (let i=0; i<n-1; i++) {
        for (let j = i+1; j<n; j++) {
            const a = Number(values[i])
            const b = Number(values[j])
            if ((a+b) === k) {
                result.push(a);
                result.push(b);
                break;
            }

            if (result.length > 0) break;
        }
    }

    printResult(result);
}
doSolution();