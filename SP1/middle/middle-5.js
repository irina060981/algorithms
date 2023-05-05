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

async function doSolution() {
    const _input = await readInput()

    const n = Number(_input[0])

    const textWords = _input[1].trim().split(' ')
    let maxL = textWords[0].length
    let maxWord = textWords[0]

    for (let i=1; i<textWords.length; i++) {
      if (textWords[i].length > maxL) {
        maxL = textWords[i].length
        maxWord = textWords[i]
      }
    }
    
    
    printResult(maxWord);
    printResult(maxL);
}
doSolution();
