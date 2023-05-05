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

function readArray(_input, nStr, startIndex) {
    const arr = []

    for (let i=0; i<nStr; i++) {
        arr.push(Number(_input[startIndex+i]))
    }
    return arr
}

function printResult(result, nStr) {
    for(let i=0; i<nStr; i++) {
        console.log(result[i].join(' '))
    }
}

class Stack {  
    constructor() {  
      this.value = []
    }
  
    push (element) {
      this.value.push(element)
    }
  
    pop () {
      return this.value.pop()
    }

    peek () {
      return this.value[this.value.length-1]
    }
  
    size () {
      return this.value.length
    }
}

function searchForLeftBoundaries (arr, nPoints) {
  const heights = new Stack()
  const left = []
  const startingIndex = -1
  
  heights.push({ val: 2, index: 0})
  left.push(startingIndex)

  for (let i=1; i<nPoints; i++) {
    const curHeight = { val: arr[i], index: i }
    let finished = false

    let lastIndex

    while(!finished) {
      const lastHeight = heights.peek()
      if (lastHeight.val > curHeight.val) {
        heights.pop()
      } else {
        finished = true
        lastIndex = lastHeight.index
      }
      if (heights.size() === 0) {
        finished = true
        lastIndex = startingIndex
      }
    }

    heights.push(curHeight)
    left.push(lastIndex)
  }
  return left
}

function searchForRightBoundaries (arr, nPoints) {
  const heights = new Stack()
  const right = []
  const startingIndex = nPoints

  heights.push({ val: arr[nPoints-1], index: nPoints})
  right.unshift(startingIndex)
  for(let i=nPoints-2; i>=0; i--) {
    const curHeight = { val: arr[i], index: i}

    let finished = false
    let lastIndex

    while(!finished) {
      const lastHeight = heights.peek()
      if (lastHeight.val > curHeight.val) {
        heights.pop()
      } else {
        finished = true
        lastIndex = lastHeight.index
      }
      if (heights.size() === 0) {
        finished = true
        lastIndex = startingIndex
      }
    }

    heights.push(curHeight)
    right.unshift(lastIndex)
  }

  return right
}

function calculateSquare (arr, nPoints) {
  const left = searchForLeftBoundaries(arr, nPoints)
  const right = searchForRightBoundaries(arr, nPoints)

  let maxSquare = 0

  for(let i=0; i<nPoints; i++) {
    const curSquare = arr[i] * (right[i]-left[i]-1)
    maxSquare = maxSquare > curSquare ? maxSquare : curSquare
  }

  return maxSquare
}

async function doSolution() {
    const _input = await readInput()

    const nPoints = Number(_input[0])

    const arr = readArray(_input, nPoints, 1)
    const result = calculateSquare(arr, nPoints)
    
    console.log(result);
}
doSolution();
