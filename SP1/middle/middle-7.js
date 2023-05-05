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

    const num = Number(_input[0])
    let result = []
    let finished = false

    if (num === 0) {
      printResult(0)
      return
    }
    let nn = num
    while (nn !== 0) {
      const remainder = nn % 2
      result.unshift(remainder)
      nn = (nn-remainder) / 2 
    }
    

    printResult(result.join(''));
}
doSolution();
