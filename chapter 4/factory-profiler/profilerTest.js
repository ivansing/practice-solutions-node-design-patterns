import {createProfiler} from './profiler.js';

const getRandomArray = (len) => {
    const profiler = createProfiler(`Generating a ${len} items long array`);
    profiler.start();
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(Math.random());
    }
    profiler.end()
    return arr
}

const myNumber = process.argv[2]
if(!myNumber) {
    console.error('Please provide a number')
    process.exit(1)
}
const randomArray =  getRandomArray(1e6);
console.log(`Number ${myNumber} found: ${randomArray.indexOf(Number(myNumber))}`)