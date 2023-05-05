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

class Queue {  
  constructor(maxN) {  
    this.head = 0
    this.tail = 0
    this.maxN = maxN
    this._size = 0

    this.value = []
    this.fillEmptyArray()
  }

  emptyItem () {
    return 'None'
  }

  fillEmptyArray () {
    for(let i=0; i<this.maxN; i++) {
      this.value.push(this.emptyItem())
    }
  }

  push (element) {
    if (this._size === this.maxN) {
      console.log('error')
      return
    }

    this.value[this.tail] = element
    this.tail = (this.tail + 1) % this.maxN
    this._size +=1
    return true
  }

  pop () {
    if (this._size === 0) {
      return 'None'
    }

    const popedItem = this.value[this.head]
    this.value[this.head] = this.emptyItem()
    this.head = (this.head + 1) % this.maxN
    this._size -=1
    return popedItem
  }

  size () {
    return this._size
  }

  peek () {
    return this.value[this.head]
  }
}


function execCommands(maxN, commands, nCommand) {
  const queue = new Queue(maxN)

  for(let i=0; i<nCommand; i++) {
    const command = commands[i]

    if (command[0] === 'push') {
      queue.push(command[1])
    } else {
      console.log(queue[command[0]]())
    }
  }
}

async function doSolution() {
    const _input = await readInput()

    const nCommand = Number(_input[0])
    const maxN = Number(_input[1])
    const commands = readArray(_input, nCommand, 2)

    execCommands(maxN, commands, nCommand)
    // printResult(result);
}
doSolution();
