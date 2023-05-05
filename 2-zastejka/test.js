const _fs = require('fs');
const _readline = require('readline');

const _fileStream = _fs.createReadStream('input.txt');

const _reader = _readline.createInterface({
    input: _fileStream,
    crlfDelay: Infinity
});

function extractArr(arrLine) {
  const arrArr = arrLine.trim().split(' ')
  return arrArr
}

async function doSolution() {
  const _input = []
  for await (const line of _reader) {
    _input.push(line);
  }

  const arrLength = _input[0]
  const arr1 = extractArr(_input[1])
  const arr2 = extractArr(_input[2])

  const result = []
  for(let i = 0; i<arrLength;i++) {
    result.push(arr1[i])
    result.push(arr2[i])
  }

  console.log(result.join(' '))
}

doSolution();
