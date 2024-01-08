class StackCalculator {
    constructor() {
        this.stack = [];
    }

    putValue (value) {
        this.stack.push(value)
    }

    getValue () {
        return this.stack.pop()
    }

    peekValue () {
        return this.stack[this.stack.length - 1]
    }

    divide () {
        const divisor = this.getValue()
        const dividend = this.getValue()
        const result = dividend / divisor
        this.putValue(result)
        return result
    }

    multiply () {
        const multiplicand = this.getValue()
        const multiplier = this.getValue()
        const result = multiplier * multiplicand
        this.putValue(result)
        return result
    }
}

function patchCalculator (calculator) {
    // new method
    calculator.add = function () {
        const addend2 = this.getValue()
        const addend1 = this.getValue()
        const result = addend1 + addend2
        this.putValue(result)
        return result
    }

    // modified method
    const divideOrig = calculator.divide
    calculator.divide = () => {
        // additional validation
        const divisor = calculator.peekValue()
        if (divisor === 0) {
            throw Error('Division by zero')
        }
        // if valid delegate to the subject or the original method
        return divideOrig.apply(calculator)
    }

    return calculator
}

const calculator = new StackCalculator()
const enhancedCalculator = patchCalculator(calculator)

enhancedCalculator.putValue(3)
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.add()) // 3 + 2 = 5
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.multiply()) // 5 * 2 = 10
enhancedCalculator.putValue(0)
// console.log(enhancedCalculator.divide()) // 10 / 0 = Error