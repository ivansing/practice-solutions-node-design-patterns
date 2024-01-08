const EventEmitter = require("events").EventEmitter;
const fs = require("fs");
const util = require('util')

const FindPattern = regex => {
    EventEmitter.call(this);
    this.regex = regex;
    this.files = [];
}
util.inherits(FindPattern, EventEmitter);

FindPattern.prototype.addFile = function(file) {
    this.files.push(file);
    return this;
}

FindPattern.prototype.find = function() {
    const self = this;
    self.files.forEach(function(file) {
        fs.readFile(file, 'utf-8', function(err, content) {
            if(err)
                return self.emit('error', err);

            self.emit('fileread', file);
            let match = null;
            if(match = content.match(self.regex)) {
                match.forEach(function(elem) {
                    self.emit('found', file, elem);
                })
            }   
        })
    })
    return this;
}

const findPattern = (files, regex) => {
  const emitter = new EventEmitter();
  files.forEach((file) => {
    fs.readFile(file, "utf-8", (err, content) => {
      if (err) return emitter.emit("error", err);

      emitter.emit("fileread", file);
      let match = null;
      if (match = content.match(regex)) {
        match.forEach((elem) => {
          emitter.emit("found", file, elem);
        });
      }
    });
  });
  return emitter;
};

findPattern(["fileA.txt", "fileB.json"], /hello \w+/g)
        .on('fileread', function(file) {
            console.log(file + ' was read');
        })
        .on('found', function(file, match) {
            console.log('Matched "' + match + '" in file ' + file);
        })
        .on('error', function(err) {
            console.log('Error emitted: ' + err.message);
        })

const findPatternObject = new FindPattern(/hello \w+/);
findPatternObject
    .addFile('fileA.txt')
    .addFile('fileB.json')
    .find()
    .on('found', (file, match) => {
        console.log(`Matched ${match} in file ${file}`)
    })
    .on('error', (err) => {
        console.log('Error emitted' + err.message);
    })        