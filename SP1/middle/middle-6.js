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

function isLetter(symbol) {
  if (('a'<=symbol)&&('z'>=symbol)) return true
  if (('A'<=symbol)&&('Z'>=symbol)) return true
  return false
}

async function doSolution() {
    const _input = await readInput()

    const text = _input[0].trim()
    const textL = text.length

    let finish = false
    let isPalindrom = true
    let iStart = 0
    let iEnd = textL

    while(!finish) {
      let a = text[iStart]
      while(!isLetter(a)) {
        iStart++
        a = text[iStart]
      }

      let b = text[iEnd]
      while(!isLetter(b)) {
        iEnd--
        b = text[iEnd]
      }

      if (iStart===iEnd) { finish = true}
      else if (a.toLowerCase()!==b.toLowerCase()) {
        isPalindrom = false
        finish = true
      }
      iStart++
      iEnd--
      if ((iStart===iEnd)||(iEnd<iStart)) { finish = true}
    }

    printResult(isPalindrom ? 'True' : 'False');
}
doSolution();
