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

function createPrimeArray(maxN) {
  const numbers = []
  let i = 2
  let maxI = Math.sqrt(maxN)
  let finished = false

  let nn = maxN

  while (!finished) {
    if ((nn % i) === 0) {
      numbers.push(i)
      nn = nn/i
    }
    i++
    if (i > maxI) {
      numbers.push(nn)
      finished = true
    } else {
      finished = nn === 1
    }
  }

  const final = []

  if (numbers.length === 1) { return numbers }

  for (let j = numbers.length-1; j>0; j--) {
    for (let k=0; k<j; k++) {
      if ((numbers[j] % numbers[k]) === 0) {
        numbers[j] = 0
        break
      }
    }
  }

  for (let j=0; j<numbers.length; j++) {
    if (numbers[j] !== 0) { final.push(numbers[j]) }
  }
  return final
}

async function doSolution() {
  const _input = await readInput()

  const n = Number(_input[0])
  const numbers = createPrimeArray(n)

  const result = []
  let finished = false
  let nn = n

  while (!finished) {

    let i = 0
    let innerFinished = false
    while (!innerFinished) {
      if ((nn % numbers[i]) === 0) {
        result.push(numbers[i])
        nn = nn/numbers[i]
        innerFinished = true
      } else {
        i++
        innerFinished = i===numbers.length
      }
    }

    if (i === numbers.length) {
      result.push(nn)
      nn = 1
    }
    if (nn === 1) {
      finished = true
    }
  }

  printResult(result.join(' '))
}

doSolution();
