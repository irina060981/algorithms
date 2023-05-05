// Задача A. Ближайший ноль
// ссылка на отчет в Контесте - https://contest.yandex.ru/contest/22450/run-report/86444650/

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
  
  if (houses[0] !== '0') { checkRes.push(n) } else { checkRes.push(0) }
  for (let i=1; i<n; i++) {
    if (houses[i] !== '0') { checkRes.push(checkRes[i-1]+1) }
    else { checkRes.push(0) }
  }

  for (let i = n - 2; i >= 0; i--) {
    if (houses[i] !== '0') {
      checkRes[i] = checkRes[i] < (checkRes[i+1]+1) ? checkRes[i] : checkRes[i+1]+1
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