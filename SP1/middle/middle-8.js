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

function sumArrays (arr1, nArr1, arr2) {
  const nArr2 = arr2.length

  let finished = false
  let result = []

  let remainder = 0
  let i1 = nArr1-1
  let i2 = nArr2-1

  while(!finished) {
    let sumEl = (i1 === -1 ? 0 : Number(arr1[i1])) + (i2 === -1 ? 0 : Number(arr2[i2])) + remainder
    let el = sumEl % 2
    result.unshift(el)

    remainder = (sumEl-el) / 2

    i1 = i1 >= 0 ? i1-1 : -1
    i2 = i2 >= 0 ? i2-1 : -1

    finished = (i1===-1) && (i2 === -1) && (remainder === 0)
  }
  return result
}

async function doSolution() {
    const _input = await readInput()

    const num1 = _input[0].split('')
    const num2 = _input[1].split('')
    
    const result = sumArrays(num1, num1.length, num2)
    
    printResult(result.join(''));
}
doSolution();
