// function* fruitGenerator() {
//     yield 'apple';
//     yield 'orange';
//     return 'watermelon';
// }

// const newFruitGenerator = fruitGenerator();
//     console.log(newFruitGenerator.next());
//     console.log(newFruitGenerator.next());
//     console.log(newFruitGenerator.next());

const fruitGenerator = function* () {
  yield "apple";
  yield "orange";
  return "watermelon";
};


const runGenerator = async () => {
    const newFruitGenerator = fruitGenerator();
    console.log(newFruitGenerator.next());
    console.log(newFruitGenerator.next());
    console.log(newFruitGenerator.next());
}
runGenerator()


