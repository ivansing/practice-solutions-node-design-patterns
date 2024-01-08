import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFileName } from './utils.js'

function saveFile(filename, contents, callback) {
    mkdirp(path.dirname(filename), function(err) {
        if(err) {
            return callback(err)
        }
        fs.writeFile(filename, contents, callback)
    })
}

function download(url, filename, callback) {
    console.log(`Downloading ${url}`)
    superagent.get(url).end((err, res) => {
        if(err) {
            return callback(err)
        } else {
            saveFile(filename, res.text, (err) => {
                console.log(`Downloaded and saved: ${url}`)
                if(err) {
                    return callback(err)
                }
                callback(null, res.text)
            })
        }
    })
}

export function spider(url, cb) { // cb callback
    const filename = urlToFileName(url)
    fs.access(filename, err => {
        if(!err || err.code !== 'ENOENT') {
            return cb(null, filename, false)
        }
        download(url,filename, err => {
            if(err) {
                return cb(err)
            }
            cb(null, filename, true)
        })
    })
} 
