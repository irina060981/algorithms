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

async function doSolution() {
  const _input = await readInput()

  const n = Number(_input[0]);
  const values = _input[1].trim().split(' ');
  const k = Number(_input[2]);

  const checkSum = [0];
  for (let i = 0; i<k; i++) {
    checkSum[0] += Number(values[i]);
  }

  const result = [ checkSum[0]/k ];

  for(let i = k; i<n;i++) {
    const mValue = checkSum[i-k] - Number(values[i-k]) + Number(values[i]);
    checkSum.push(mValue);
    result.push(mValue/k);
  }

  printResult(result);
}
doSolution();