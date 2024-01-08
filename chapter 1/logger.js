// exports.info = function (message) {
//   console.log("info: " + message);
// };
// exports.verbose = function (message) {
//   console.log("verbose: " + message);
// };

// function Logger(name) {
//   this.name = name;     // instance  constructor

// No instance new word and it's a factory 
function Logger(name) {
    if(!(this instanceof Logger)) {
        return new Logger(name);
    }
    this.name = name;  // instance  constructor
    this.count = 0;
}

// Exporting an instance like Singleton
function Logger(name) {
    this.count = 0;
    this.name = name;
}

Logger.prototype.log = function (message) {
  this.count++;  
  console.log("[" + this.name + "] " + message);
};
module.exports = new Logger('DEFAULT');

Logger.prototype.info = function (message) {
  this.log("info: " + message);
};
Logger.prototype.verbose = function (message) {
  this.log("verbose: " + message);
};
module.exports = Logger;
module.exports.Logger = Logger;