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

function printResult(result, nStr) {
    for(let i=0; i<nStr; i++) {
        console.log(result[i])
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

  size () {
    return this.value.length
  }

  get_max () {
    const cacheValue = []
    let maxElement = 'None'
    let stackSize = this.size()

    for (let i=0; i<stackSize; i++) {
      const element = Number(this.pop())
      cacheValue.push(element)

      maxElement = maxElement === 'None' ? element : Math.max(maxElement, element)
    }

    for (let i=0; i<stackSize; i++) {
      this.value.push(cacheValue.pop())
    }

    return maxElement
  }
}


function execCommands(commands, nCommand) {
  const stack = new Stack()

  for(let i=0; i<nCommand; i++) {
    const command = commands[i]

    if (command[0] === 'push') {
      stack.push(command[1])
    } 

    if (command[0] === 'get_max') {
      console.log(stack.get_max())
    }

    if (command[0] === 'pop') {
      if (stack.size() > 0) { stack.pop() }
      else {
        console.log('error')
      }
    }
  }
}

async function doSolution() {
    const _input = await readInput()

    const nCommand = Number(_input[0])
    const commands = readArray(_input, nCommand, 1)

    const result = execCommands(commands, nCommand)
    printResult(result);
}
doSolution();
