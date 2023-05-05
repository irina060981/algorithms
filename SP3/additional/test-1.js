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

function createMatreshka (nMatreshka) {
    if (nMatreshka >= 1) {
        console.log(`Создаём низ матрёшки размера ${nMatreshka}.`)
        createMatreshka(nMatreshka - 1)
        console.log(`Создаём верх матрешки размера ${nMatreshka}.`)
    } else return 
}

async function doSolution() {
    const _input = await readInput()

    const nMatreshka = Number(_input[0])

    const result = createMatreshka(nMatreshka)
    
    console.log(result);
}
doSolution();
