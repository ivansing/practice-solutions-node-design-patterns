const stream = require('stream')
const util = require('util')

function ReplaceStream(searchString, replaceStream) {
    stream.Transform.call(this, {decodeStrings: false})
    this.searchString = searchString
    this.replaceStream = replaceStream
    this.tailPiece = ''
}
util.inherits(ReplaceStream, stream.Transform)

ReplaceStream.prototype._transform = function (chunk, encoding, cb) {
    let pieces = (this.tailPiece + chunk).split(this.searchString)
    let lastPiece = pieces[pieces.length - 1]
    let tailPieceLen = this.searchString.length - 1

    this.tailPiece = lastPiece.slice(-tailPieceLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen)

    this.push(pieces.join(this.replaceStream))
    cb()
}

ReplaceStream.prototype._flush = function (cb) {
    this.push(this.tailPiece)
    cb()
}
module.exports = ReplaceStream