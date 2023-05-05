const _fs = require('fs');
const _readline = require('readline');
const { start } = require('repl');

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

function calculateCommits (n, k) {
  let divider = 1
  for(let i =1; i<=k+1; i++) divider = divider *10

  const calcItems = []

  for(let i=0; i<=n; i++) {
    const curItem = (i<=1) ? 1 : calcItems[0] + calcItems[1]
    calcItems.push(curItem % divider)
    if (i > 1) {
      calcItems.shift()
    }
  }

  return calcItems[calcItems.length-1] % (divider/10)
}


async function doSolution() {
    const _input = await readInput()

    const nArr = _input[0].trim().split(' ')
    const n = Number(nArr[0])
    const k = Number(nArr[1])

    const result = calculateCommits(n, k)

    console.log(result)
    
}
doSolution();
