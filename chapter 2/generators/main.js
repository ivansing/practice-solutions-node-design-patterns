function* makeGenerator() {
    yield 'Hello world';
    console.log('Re-entered');
}

const gen = makeGenerator()
console.log(gen)