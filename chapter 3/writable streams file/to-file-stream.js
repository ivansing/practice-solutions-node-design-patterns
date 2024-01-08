const { Transform } = require('stream')
const fs = require('fs').promises
const {join, dirname} = require('path')



const tfs = new Transform({
    objectMode: true,
    transform(chunk, encoding, cb) {
      fs.mkdir(dirname(chunk.path), { recursive: true })
        .then(() => fs.writeFile(chunk.path, chunk.content))
        .then(() => cb())
        .catch(cb);
    }
  });


  tfs.write({ path: join('files', 'file1.txt'), content: 'Hello' })
  tfs.write({ path: join('files', 'file2.txt'), content: 'Node.js' })
  tfs.write({ path: join('files', 'file3.txt'), content: 'streams' })
  tfs.end(() => console.log('All files created'))

