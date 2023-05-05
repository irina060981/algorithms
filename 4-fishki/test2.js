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

function printResult(result) {
    if (result.length === 0) {
        console.log('None')
        return
    }
    console.log(result.join(' '))
}

async function doSolution() {
    const _input = await readInput()

    const n = Number(_input[0]);
    const values = _input[1].trim().split(' ');
    const k = Number(_input[2]);

    const valuesDict = {}

    let result = []
    for (let j = 0; j< n; j++) {
        const a = Number(values[j])
        const searchFor = k - a
        if (valuesDict[searchFor]) {
            if ((searchFor !== a) || (valuesDict[searchFor] > 1)) {
                result.push(a);
                result.push(searchFor)
                break;
            }
        }

        
        if (!valuesDict[a]) { valuesDict[a] = 1} 
        else {
            valuesDict[a] = valuesDict[a] + 1
        }
    }

    printResult(result);
}
doSolution();