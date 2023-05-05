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
    let result = false
  
    if (n === 1) {
      printResult('True')
    } else {
      let finish = false
      let nn = n

      while(!finish) {
        if (nn === 1) { 
          finish = true; 
        }
        else if ((nn % 4) !== 0) { 
          finish = true; 
          result = false 
        }
        else {
          nn = nn / 4
          result = true;
        }
      }

      printResult(result ? 'True' : 'False');
    }
}
doSolution();
