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

class Node {  
  constructor(value = null, next = null) {  
    this.value = value;  
    this.next = next;  
  }  
}

class QueueList {  
  constructor() {  
    this.head = null
    this._size = 0
    this.tail = null
  }

  size () {
    return this._size
  }

  get () {
    if (this._size === 0) {
      return 'error'
    }

    const value = this.head.value
    this.head = this.head.next
    if (this._size === 1) {
      this.tail = null
    }
    this._size -=1
    return value
  }

  put (element) {
    if (!this.head) {
      this.head = new Node(element)
      this.tail = this.head
    } else {
      this.tail.next = new Node(element)
      this.tail = this.tail.next
    }
    this._size +=1
  }
}


function execCommands(commands, nCommand) {
  const queue = new QueueList()

  for(let i=0; i<nCommand; i++) {
    const command = commands[i]

    if (command[0] === 'put') {
      queue.put(command[1])
    } else {
      console.log(queue[command[0]]())
    }
  }
}

async function doSolution() {
    const _input = await readInput()

    const nCommand = Number(_input[0])
    const commands = readArray(_input, nCommand, 1)

    execCommands(commands, nCommand)
}
doSolution();
