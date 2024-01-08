const iteratorGenerator = function* (arr)  {
    for(let i = 0; i < arr.length; i++) {
        yield arr[i];
    }
}

const iterator = iteratorGenerator(['apple', 'orange', 'watermelon'])

// currentItem: This gets the next item from the iterator using iterator.next().
let currentItem = iterator.next();

// if current item is falsy
while(!currentItem.done) {
    console.log(currentItem.value);
    currentItem = iterator.next();
}

const twoWayGenerator = function* () {
    let what = yield null; // make a pause
    console.log(`Hello ${what}`) // goes back to yield to resume with that variable
}

const twoWay = twoWayGenerator();
twoWay.next()
// twoWay.throw(new Error()) // throw Error
twoWay.next('world'); // Hello World 

 

