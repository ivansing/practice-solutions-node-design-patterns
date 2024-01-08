class StackCalculator {
    constructor() {
        this.stack = []
    }

    putValue(value) {
        this.stack.push(value)
    }

    getValue() {
        return this.stack.pop()
    }

    peekValue() {
        return this.stack[this.stack.length - 1]
    }

    clear() {
        this.stack = []
    }

    divide() {
        const divisor = this.getValue()
        const divident = this.getValue()
        const result = divident / divisor
        this.putValue(result)
        return result
    }

    multiply() {
        const multiplicand = this.getValue()
        const multiplier = this.getValue()
        const result = multiplier * multiplicand
        this.putValue(result)
        return result
    }

    add() {
        const addend = this.getValue()
        const augent = this.getValue()
        const result = addend + augent
        this.putValue(result)
        return result
    }

    subtract() {
        const subtrahend = this.getValue()
        const minuend = this.getValue()
        const result = minuend - subtrahend
        this.putValue(result)
        return result
    }
}

function createSafeCalculator (calculator) {
    return {

        // proxied method
        divide () {
            const divisor = calculator.peekValue()
            if (divisor === 0) {
                throw Error('Division by 0')
            }

            return calculator.divide()
        },

        // delegated methods
        putValue (value) {
            calculator.putValue(value)
        },

        getValue () {
            calculator.getValue()
        },

        peekValue () {
            calculator.peekValue()
        },

        clear () {
            calculator.clear()
        },

        multiply () {
            calculator.multiply()
        },
    }
}

const calculator = new StackCalculator()
const safeCalculator = createSafeCalculator(calculator)

calculator.putValue(3)
calculator.putValue(2)
console.log(calculator.multiply()) // 3 * 2 = 6

safeCalculator.putValue(2)
console.log(calculator.multiply()) // 6 * 2 = 12

safeCalculator.putValue(2)
console.log(calculator.multiply()) // 12 * 2 = 24

calculator.putValue(0)
console.log(calculator.divide()) // 12 / 0 = Infinity

// New stack 
safeCalculator.clear()
safeCalculator.putValue(3)
safeCalculator.putValue(0)
console.log(safeCalculator.divide()) // Error: Division by 0