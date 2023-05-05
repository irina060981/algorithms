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

function collectDictMatrix(matrix) {
  const res = {}
  for(let i=0; i<4; i++) {
    for(let j=0; j<4; j++) {
      const number = matrix[i][j]
      if (number === '.') continue

      if (!res[number]) res[number] = 0
      res[number]++
    }
  }
  return res
}

function countMaxPoints(dictMatrix, k) {
  let res = 0
  const checkK = k*2
  Object.keys(dictMatrix).forEach(key => {
    if (dictMatrix[key] <= checkK) {
      res++
    }
  })
  return res
}

async function doSolution() {
    const _input = await readInput()

    const k = Number(_input[0])
    const matrix = []
    matrix.push(_input[1].trim().split(''))
    matrix.push(_input[2].trim().split(''))
    matrix.push(_input[3].trim().split(''))
    matrix.push(_input[4].trim().split(''))

    const dictMatrix = collectDictMatrix(matrix)
    const result = countMaxPoints(dictMatrix, k)
    printResult(result);
}
doSolution();