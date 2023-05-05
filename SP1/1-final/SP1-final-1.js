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
    console.log(result.join(' '))
}

function checkHouses (n, houses) {
  const checkRes = []
  
  let lastZero = -1

  for (let i=0; i<n; i++) {
    if (houses[i] !== '0') continue 

    for(let j=lastZero+1; j<i; j++) {
      const dir1 = i-j
      const dir2 = lastZero === -1 ? -1 : j-lastZero
      checkRes.push(dir2 === -1 || dir2 > dir1 ? dir1 : dir2)
    }
    checkRes.push(0)
    lastZero = i        
  }

  if (checkRes.length !== n) {
    for(let j=lastZero+1; j<n; j++) {
      checkRes.push(j-lastZero)
    }
  }

  return checkRes
}

async function doSolution() {
    const _input = await readInput()

    const n = Number(_input[0])
    const houses = _input[1].trim().split(' ')
    const result = checkHouses(n, houses)

    printResult(result);
}
doSolution();