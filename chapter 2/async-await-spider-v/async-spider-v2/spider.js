import {promises as fsPromises} from 'fs'
import {dirname} from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import {promisify} from 'util'
import {getPageLinks, urlToFilename} from './utils.js'



const mkdirpPromises = promisify(mkdirp)

async function download (url, filename) {
    console.log(`Downloading ${url}`)
    const {text: content} = await superagent.get(url)
    await mkdirpPromises(dirname(filename))
    await fsPromises.writeFile(filename, content)
    console.log(`Downloaded and saved: ${url}`)
    return content
}

async function spiderLinks (currentUrl, content, nesting) {
    if(nesting === 0) {
        return
    }
    const links = getPageLinks(currentUrl, content)
    for (const link of links) {
        await spider(link, nesting -1)
    }
}

export async function spider (url, nesting) {
    const filename = urlToFilename(url)
    let content 
    try {
        content = await fsPromises.readFile(filename, 'utf-8')
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err
        }

        content = await download(url, filename)
    }

    return spiderLinks(url, content, nesting)
}