/*
v2 - https://contest.yandex.ru/contest/22781/run-report/86851718/
v1 - https://contest.yandex.ru/contest/22781/run-report/86813059/

-- ПРИНЦИП РАБОТЫ
Реализация алгоритма имитации работы калькулятора, использующего польскую нотацию, 
основана на использовании стека:
  - если на вход подается операнд, то она записывается в стек,
  - если на вход подается оператор, то извлекаем из стека два последних операнда, 
    помня, что первый тот, кто был помещен в стек раньше, и производим вычисление, исходя из оператора,
  - результат помещаем в стек как новый операнд,
  - выполняем эти шаги, пока не пройдем по всему выражению,
  - после последнего шага на вершине стека получаем результат (как результат последней операции из выражения);
Операторы хранятся в виде объекта, для экономии времени проверки.
Для выполнения операции написана простая функция, которая по нотации оператора выполняет вычисление.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
В соответствии с условиям задачи каждый оператор имеет приоритет в соответствии 
с местом нахождения в выражении. Поддержка скобок для изменения приоритета в условия задачи не входит.
Таким образом считывая выражение с начала и применяя операторы в соответствии с их появлением,
приоритет вычислений сохраняется. 

Что сводит задачу к последовательному считыванию, применению оператора и замене группы на числовой результат.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Шаги вычислений зависят от 
  - длины выражения - O(n), где n - количество операторов/операндов в выражении
  - при считывании операнда - выполянем операция сохранения в стек - O(1) - константное время
  - при считывании оператора - извлекаем за O(1), вычисляем и сохраняем за O(1) - константное время
  - финальное извлечение результата - O(1) - константное время

Таким образом получаем O(n),  где n - количество операторов/операндов в выражении

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Для алгоритма нам требуется следующее хранение
  - выражение для вычисления - O(n), где n - количество операторов/операндов в выражении
  - стек для хранения результатов - при корректном выражении в худшем случае будет находиться половина выражения - O(n/2)

Получаем O(n) + O(n/2) ~ O(n), где n - количество операторов/операндов в выражении
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
}

function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

function calculate (expression) {
  const operandsStack = new Stack()
  const OPERATORS_DICT = { 
    '*': (a,b) => a*b, 
    '+': (a,b) => a+b, 
    '-': (a,b) => a-b, 
    '/': (a,b) => Math.floor(a / b)
  }

  try {
    for(const item of expression) {
      if (isNumeric(item)) {    
        operandsStack.push(Number(item))
      } else if (OPERATORS_DICT[item]) {
        const operand2 = operandsStack.pop()
        const operand1 = operandsStack.pop()
        const stepResult = OPERATORS_DICT[item](operand1, operand2)
        operandsStack.push(stepResult)
      } else {
        throw 'Non correct expression for calculation'
      }
    }
    return operandsStack.pop()
  } catch (err) {
    console.error(err)
  }  
}


async function doSolution() {
    const _input = await readInput()

    const expression = _input[0].trim().split(' ')
    const result = calculate(expression)

    console.log(result)
    
}
doSolution();
