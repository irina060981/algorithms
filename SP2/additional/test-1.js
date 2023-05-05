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
        arr.push(Number(_input[startIndex+i]))
    }
    return arr
}

function printResult(result, nStr) {
    for(let i=0; i<nStr; i++) {
        console.log(result[i].join(' '))
    }
}

function calculateSquare (arr, nPoints) {
  console.info(arr)
  let maxSquare = 0

  for (let i=0; i<nPoints; i++) {
    let minPoint = arr[i]
    
    for (let j=i; j<nPoints; j++) {
        minPoint = minPoint === 0 ? arr[j] : Math.min(minPoint, arr[j])
        maxSquare = Math.max(maxSquare, minPoint*(j-i+1))
    }
  }

  return maxSquare
}

async function doSolution() {
    const _input = await readInput()

    const nPoints = Number(_input[0])

    const arr = readArray(_input, nPoints, 1)
    const result = calculateSquare(arr, nPoints)
    
    console.log(result);
}
doSolution();
