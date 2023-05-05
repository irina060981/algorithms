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
        arr.push(_input[startIndex+i].trim().split(' '))
    }
    return arr
}

function printResult(result) {  
  console.log(result)
}

class Stack {  
  constructor(value = []) {  
    this.value = value
  }

  push (element) {
    this.value.push(element)
  }

  pop () {
    return this.value.pop()
  }

  size () {
    return this.value.length
  }

  peek () {
    const size = this.size()
    return size > 0 ? this.value[this.size() - 1] : undefined
  }
}

function isCorrectBracketSeq(bracketsStr) {
  const bracketsDict = {
    '(': ')', '{': '}', '[': ']'
  }
  const checkBrackets = new Stack()

  let result =true
  
  for (let i=0; i<bracketsStr.length; i++) {
    const bracket = bracketsStr[i]

    const lastBracket = checkBrackets.peek()
    if (lastBracket && bracketsDict[lastBracket] === bracket)  {
      checkBrackets.pop()
      continue
    } else if (lastBracket && (bracketsDict[bracket] === undefined)) {
      result = false
      break
    }

    checkBrackets.push(bracket)
  }

  if (checkBrackets.size() > 0) { result = false }
  return result ? 'True' : 'False'
}

async function doSolution() {
    const _input = await readInput()

    const bracketsStr = _input[0].trim().split('')
    const result = isCorrectBracketSeq(bracketsStr)
    printResult(result);
}
doSolution();
