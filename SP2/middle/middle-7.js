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

  peek () {
    const size = this.size()
    return size > 0 ? this.value[this.size() - 1] : undefined
  }
}

class StackMaxEffective {  
  constructor() {  
    this.value = []
    this.maxElements = new Stack()
  }

  defineMax (element1, element2) {
    if ((element1 === undefined) && (element2 === undefined)) return

    if ((element1 === undefined)) return element2
    if ((element2 === undefined)) return element1

    return Math.max(element1, element2)
  }

  push (element) {
    this.value.push(element)
    const maxElement = this.defineMax(this.getMax(), element)
    this.maxElements.push(maxElement)
  }

  pop () {
    const element = this.value.pop()
    this.maxElements.pop()
    return element
  }

  size () {
    return this.value.length
  }

  getMax () {
    return this.maxElements.peek()
  }

  printMax () {
    const maxElement = this.getMax()
    console.log(maxElement === undefined ? 'None' : maxElement)
  }
}


function execCommands(commands, nCommand) {
  const stack = new StackMaxEffective()

  for(let i=0; i<nCommand; i++) {
    const command = commands[i]

    if (command[0] === 'push') {
      stack.push(command[1])
    } 

    if (command[0] === 'get_max') {
      stack.printMax()
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
