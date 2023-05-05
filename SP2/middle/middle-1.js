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

function readArray(_input, nStr, startIndex) {
    const arr = []

    for (let i=0; i<nStr; i++) {
        arr.push(_input[startIndex+i].trim().split(' '))
    }
    return arr
}

function printResult(result, nStr) {
    for(let i=0; i<nStr; i++) {
        console.log(result[i].join(' '))
    }
    
}

function transposeMatrix(matrix, nStr, nCol) {
    const transpMatrix = []

    for(let i=0; i<nCol; i++) {
        transpMatrix.push([])
        for(let j=0; j<nStr; j++) {
          transpMatrix[i].push(matrix[j][i])
        }
    }
    return transpMatrix
}

async function doSolution() {
    const _input = await readInput()

    const nStr = Number(_input[0])
    const nCol = Number(_input[1])
    const matrix = readArray(_input, nStr, 2)
    const result = transposeMatrix(matrix, nStr, nCol)
    
    printResult(result, nCol);
}
doSolution();
