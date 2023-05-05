const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

function extractArr(arrLine) {
  return arrLine.trim().split(' ')
}

async function solve() {
  const arrLength = _inputLines[0];
  const arr1 = extractArr(_inputLines[1]);
  const arr2 = extractArr(_inputLines[2]);
 
  const result = []
  for(let i = 0; i<arrLength;i++) {
    result.push(arr1[i]);
    result.push(arr2[i]);
  }
  
  console.log(result.join(' '));
}

  