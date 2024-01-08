const fs = require('fs')
const path = require('path')

const generateSizeFile = filename => {
    const targetSizeBytes = (1024) * 2 // 58MB
    const chunkSize = 1024 * 1024 // 1MB chunk size

    const writeChunk = () => {
        // if the file doesn't exit or it's size is less than the target size
        if (!fs.existsSync(filename) || fs.statSync(filename).size < targetSizeBytes) {

            // Create a buffer with the specified chunk size
            const buffer = Buffer.alloc(chunkSize)

            // Append the buffer to the file synchronously
            fs.appendFileSync(filename, buffer)
            process.nextTick(writeChunk) // continue writing
        } else {
            console.log(`File ${filename} successfuly generated at: ${path.resolve(filename)}`)
        }
    }

    writeChunk()
}

const filename = './testFile1GB.dat'

generateSizeFile(filename)