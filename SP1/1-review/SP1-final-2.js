// Задача B. Ловкость рук
// ссылка на отчет в Контесте - https://contest.yandex.ru/contest/22450/run-report/86444735/

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

function readArray(_input, startIndex, endIndex, splitCondition) {
  const arr = []
  for(let i=startIndex; i<=endIndex; i++) {
    arr.push(_input[i].trim().split(splitCondition))
  }
  return arr
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

function countMaxPoints (matrix, kButtons, players) {
  const dictMatrix = collectDictMatrix(matrix)
  let res = 0
  const checkK = kButtons*players
  Object.keys(dictMatrix).forEach(key => {
    if (dictMatrix[key] <= checkK) {
      res++
    }
  })
  return res
}

async function doSolution() {
    const PLAYERS = 2

    const _input = await readInput()

    const kButtons = Number(_input[0])
    const matrix = readArray(_input, 1, 4, '')

    const result = countMaxPoints(matrix, kButtons, PLAYERS)
    printResult(result);
}
doSolution();