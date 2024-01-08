const ReplaceStream = require('./replace-stream')

const rs = new ReplaceStream('World', 'Node.js')

rs.on('data', chunk => console.log(chunk.toString()))

rs.write('Hello W') 
rs.write('orld!')
rs.end()