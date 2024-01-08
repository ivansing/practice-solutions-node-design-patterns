// const logger = require('./logger.js')
// logger('This is an informational message');

// logger.verbose('This is a verbose message');

const Logger = require('./logger');
// const logger = require('./logger');

// logger.info('This is an informational message');
// logger.verbose('This is a verbose message');

const dbLogger = new Logger('DB');
dbLogger.info('This is a message from logger module.');
const accessLogger = new Logger('ACCESS'); // with instantiation
accessLogger.verbose('This is a verbose message from logger module with an instance.');

const dbLoggerNoNew = Logger('DB'); // without instantiation
dbLoggerNoNew.verbose('This is a verbose message no instance.');

// const logger = require('./logger');
// logger.log('This is an export instance') 

// var customLogger = new logger.Logger('CUSTOM');
// customLogger.log('This is an informational message');

require('./patcher');
const logger2 = require('./logger')
logger2.customMessage();