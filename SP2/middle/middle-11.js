const _fs = require('fs');
const _readline = require('readline');
const { start } = require('repl');

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

function calculateCommits (n) {
  if ((n===0)||(n===1)) { 
    return 1
  }
  return calculateCommits(n-1)+calculateCommits(n-2)
}


async function doSolution() {
    const _input = await readInput()

    const n = Number(_input[0])
    const result = calculateCommits(n)

    console.log(result)
    
}
doSolution();
