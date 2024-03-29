import { promises as fsPromises } from 'fs'
import { dirname } from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { promisify } from 'util'
import { getPageLinks, urlToFilename } from './utilsPromises.js'

getPageLinks

const mkdirpPromises = promisify(mkdirp)

function download (url, filename) {
  console.log(`Downloading ${url}`)
  let content
  return superagent.get(url)
    .then((res) => {
      content = res.text
      return mkdirpPromises(dirname(filename))
    })
    .then(() => fsPromises.writeFile(filename, content))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`)
      return content
    })
}

function spiderLinks (currentUrl, content, nesting) {
  let promise = Promise.resolve()
  if (nesting === 0) {
    return promise
  }
  const links = getPageLinks(currentUrl, content)
  const promises = links.map(function(link) {
    return spider(link, nesting - 1)
  })
//   for (const link of links) {
//     promise = promise.then(() => spider(link, nesting - 1))
//   }

  return Promise.all(promises)
}

export function spiderParallelExecution (url, nesting) {
  const filename = urlToFilename(url)
  return fsPromises.readFile(filename, 'utf8')
    .catch((err) => {

       // If file does not exist
      if (err.code !== 'ENOENT') {
        throw err
      }

      
      return download(url, filename)
    })
    .then(content => spiderLinks(url, content, nesting))
}
