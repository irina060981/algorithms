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

    const n = Number(_input[0])
    const m = Number(_input[1])
    const x = Number(_input[2+n])
    const y = Number(_input[2+n+1])

    const matrix = []
    for (let i = 0; i<n; i++) {
        const row = _input[i+2].trim().split(' ')
        matrix.push(row)
    }
    
    const neighbours = []
    if (x > 0) neighbours.push(Number(matrix[x-1][y]))
    if (x < (n-1)) neighbours.push(Number(matrix[x+1][y]))
    if (y > 0) neighbours.push(Number(matrix[x][y-1]))
    if (y < (m-1)) neighbours.push(Number(matrix[x][y+1]))

    
    printResult(neighbours.sort((a,b)=>a-b).join(' '));
}
doSolution();
