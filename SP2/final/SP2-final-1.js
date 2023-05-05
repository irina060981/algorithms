/*
v2 - https://contest.yandex.ru/contest/22781/run-report/86851665/
v1 - https://contest.yandex.ru/contest/22781/run-report/86789177/

-- ПРИНЦИП РАБОТЫ
Двухсторонняя очередь реализована следующим образом (кольцевой буфер):
  - есть массив фиксированной длины
  - отслеживаем индекс элемента головы и хвоста
  - отслеживаем размер
  - при добавлении в начало: сдвигаем голову вперед, если индекс головы = 0, то сдвигаем на конец массива
  - при добавлении в конец: сдвигаем хвост на единицу вперед, если это был поседний индекс массива, то сдвигаем на ноль
  - при добавлении сначала проверяем, не полна ли очередь
  - при извлечении с начала: извлекаем элемент с индекса головы, сдвигаем голову вперед, проверяем 
      - не были ли мы в конце ассива, если в конце, перепрыгиваем на начало
      - если это был последний элемент - обнуляем и голову, хвост
  - при извлечении с конца: извлекаем массив по индексу хвоста, хвост сдвигаем назад, проверяем
      - если хвост был в начале массива, то перепрыгиваем на конец
      - если это был последний элемент - обнуляем и голову, хвост

Решение односторонней очереди было в промежуточных заданиях - 
https://contest.yandex.ru/contest/22779/run-report/86619632/

Для решения данной задачи понадобилось лишь немного доработать

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Условием решения задачи было требование, чтобы операции добавления и извлечения выполнялись за константное время - O(1).
В моей реализации добавление и удаление выполняется за константное время, так как  длина массива константна.
И при добавлении известен индекс массива, на который записываем элемент, и при удалении известен индекс для извлечения.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
В соответствии с предыдущим пунктом
  push_front - O(1)
  push_back - O(1)
  pop_front - O(1)
  pop_back - O(1)

Для подготовки очереди требуется создать сам массив фиксированной длины - O(n)
Таким образом общая сложность задачи:

  O(n) + O(k), где n- длина очереди, k-количество команд - линейная сложность

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для работы задачи нам нужно:
  - фиксированный массив очереди - O(n)
  - фиксированный массив команд - O(k)
  - целые переменные - хвост, голова, размер, кол-во команд, максимальная длина очереди - O(1) - в итоговом расчете отбрасываем как константу

Получаем 
   O(n) + O(k)

*/

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

class Deque {  
  constructor(maxN) {  
    this.head = 0
    this.tail = 0
    this.maxN = maxN
    this._size = 0

    this.value = []
    this.fillEmptyArray()
  }

  get emptyItem () {
    return 'None'
  }

  get isFull () {
    return this._size === this.maxN
  }

  get isEmpty () {
    return this._size === 0
  }

  fillEmptyArray () {
    for(let i=0; i<this.maxN; i++) {
      this.value.push(this.emptyItem)
    }
  }

  pushBack (element) {
    if (this.isFull) {
      // console.log('error')
      throw 'error'
    }

    this.tail = this.isEmpty ? 0 : (this.tail + 1) % this.maxN
    this.value[this.tail] = element
    this._size +=1
    return true
  }

  pushFront (element) {
    if (this.isFull) {
      throw 'error'
    }

    this.head = this.isEmpty ? 0 : (this.head - 1 + this.maxN) % this.maxN 
    this.value[this.head] = element
    this._size +=1
    return true
  }

  popFront () {
    if (this.isEmpty) {
      throw 'error'
    }

    const popedItem = this.value[this.head]
    this.value[this.head] = this.emptyItem
    this._size -=1
    this.head = this.isEmpty ? 0 : (this.head + 1) % this.maxN
    if (this.isEmpty) { this.tail = 0 }
    
    return popedItem
  }

  popBack () {
    if (this.isEmpty) {
      throw 'error'
    }

    const popedItem = this.value[this.tail]
    this.value[this.tail] = this.emptyItem
    this._size -=1
    this.tail = this.isEmpty ? 0 :  (this.tail - 1 + this.maxN) % this.maxN 
    if (this.isEmpty) { this.head = 0 }
    return popedItem
  }

}


function execCommands(maxN, commands, nCommand) {
  const queue = new Deque(maxN)
  const commandDict = {
    'push_front': 'pushFront',
    'push_back': 'pushBack',
    'pop_front': 'popFront',
    'pop_back': 'popBack'
  }

  for(let i=0; i<nCommand; i++) {
    const [commandType, value] = commands[i]
    const classCommand = commandDict[commandType]

    try {
      if ((commandType === 'push_front')||(commandType === 'push_back')) {
        queue[classCommand](value)
      } else {
        console.log(queue[classCommand]())
      }
    } catch (err) {
      console.log(err)
    }
  }
}

async function doSolution() {
    const _input = await readInput()

    const nCommand = Number(_input[0])
    const maxN = Number(_input[1])
    const commands = readArray(_input, nCommand, 2)

    execCommands(maxN, commands, nCommand)

}
doSolution();
