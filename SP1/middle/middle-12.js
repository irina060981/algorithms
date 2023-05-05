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

function printResultFinal(result) {
    console.log(result)
}


async function doSolution() {
    const _input = await readInput()

    const strS = _input[0].trim()
    const strT = _input[1].trim().split('')
    const len = strS.length
    let strTLen = len + 1

    for(let i=0; i<len; i++) {
      let checkChar = strS[i]

      for(let j=0; j<strTLen; j++) {
        if (strT[j] === checkChar) {
          strT.splice(j, 1)
          strTLen = strTLen-1
          break
        }
      }
    }
    printResultFinal(strT[0]);
}
doSolution();