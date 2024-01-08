const fs = require('fs')
const path = require('path')

const asyncFlow = generatorFunction => {
    function callback(err) {
        if(err) {
            return generator.throw(err)
        }

        // creates an array 'results' containing the arguments passed to the 
        // callback function, excluding the first arguments (which is 'err')
        const results = [].slice.call(arguments, 1)

        // calls generator 'generator.next' with the results. If the is more
        // than one result, it passes an array of results; otherwise, it
        // passed a single result.
        generator.next(results.length > 1 ? results : results[0])
    }
    const generator = generatorFunction(callback)
    generator.next()
}

asyncFlow(function* (callback) {
    const filename = path.basename(__filename)
    const myself = yield fs.readFile(filename, 'utf-8', callback)
    yield fs.writeFile('clone_of_' + filename, myself, callback)
    console.log('Clone created')
})

// Generated file:
// ./clone_of_clone.js    #### Same code content like this file ####

const asyncOperationThunk = (value) => (callback) => {
    // Simulating asynchronous oepration
    setTimeout(() => {
        callback(null, value * 2)
    }, 1000)
}

const myThunk = asyncOperationThunk(21)

// Execute the thunk to start the asynchronous operation
myThunk((err, result) => {
    if(err) {
        return console.error(err)
    } else {
        console.log(result)
    }
})