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

    const tempArr = _input[1].trim().split(' ')

    let result = 0

    for (let i = 0; i<n; i++) {
      if (i==0) {
        tempArr[i] = Number(tempArr[i])
      } 
      if ((n>1) && (i<n)) {
        tempArr[i+1] = Number(tempArr[i+1])
      }

      if ((i === 0) && (n===1)) result++
      else if (i===0) {
        if (tempArr[i]>tempArr[i+1]) result++
      }
      else if (i===(n-1)) {
        if (tempArr[i]>tempArr[i-1]) result++
      } else {
        if ((tempArr[i]>tempArr[i-1]) && (tempArr[i]>tempArr[i+1])) result++
      }
    }
    
    
    printResult(result);
}
doSolution();
