const net = require("net");

const server = net.createServer((socket) => {
  // Handle the client request
  socket.on("data", (data) => {
    const response = `HTTP/1.1 200 OK\n\nHello Wolrd!`;
    socket.write(response);
  });
});

// function add(a,b) {
//     return a+b;
// }

// Syncronous function call
function add(a, b, callback) {
  callback(a + b);
}

// exports.loaded = false;
// const b = require('./b.js');
// module.exports = {
//     bWasLoaded: b.loaded,
//     loaded: true
// };

// exports.loaded = false;
// const a = require('./a.js');
// module.exports = {
//     aWasLoaded: a.loaded,
//     loaded: true
// };

// console.log('before')
// add(1,2 , (result) => {
//     console.log('Result: ', result)
// })
// console.log('after');

// Asyncronous function call
const addAsync = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 100);
};
// console.log('before')
// addAsync(1,2,(result) => {
//     console.log('RESULT: ', result);
// })
// console.log('after');

// An unpredictable function
const fs = require("fs");


const readJSON = (filename, callback) => {
  fs.readFile(filename, "utf-8", (err, data) => {
    let parsed;
    if (err)
      //propagate the error and exit the current function
      return callback(err);

    try {
      parsed = JSON.parse(data);
    } catch (err) {
      return callback(err);
    }
    // no errrors, propagete just the data
    callback(null, parsed);
  });
};

const readJSONThrows = (filename, callback) => {
  fs.readFile(filename, "utf-8", (err, data) => {
    if (err) return callback(err);
    // no errors, propagate just the data
    callback(null, JSON.parse(data));
  });
};

// try {
//     readJSONThrows('data.txt', (err) => {
//         console.log(err)                      /// This an antipattern to catch an error won't work
//     });
// } catch (error) {
//     console.log('This will not catch the JSON parsing exception')
// }

let cache = {};
const inconsistentRead = (filename, callback) => {
  if (cache[filename]) {
    //invoked synchronously
    callback(cache[filename]);
  } else {
    //asynchronous function
    fs.readFile(filename, "utf-8", (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
};

// inconsistentRead('test.txt', (data) => {
//     console.log(data)
// })

// Pattern: prefer the direct style for purely synchronous functions.

const consistentReadSync = (filename) => {
  if (cache[filename]) {
    return cache[filename];
  } else {
    cache[filename] = fs.readFileSync(filename, "utf-8");
    return cache[filename];
  }
};

const consistentReadAsync = (filename, callback) => {
  if (cache[filename]) {
    process.nextTick(() => callback(cache[filename])); // pass the next pass of the event loop
  } else {
    // asynchrounous function
    fs.readFile(filename, "utf-8", (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
};

const createFileReader = (filename) => {
  const listeners = [];
  // inconsistentRead(filename, value => {
  //     listeners.forEach(listener => listener(value));

  consistentReadAsync(filename, (value) => {
    listeners.forEach((listener) => listener(value));
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
};

// const reader1 = createFileReader("data.txt");
// reader1.onDataReady((data) => {
//   console.log("First call data:", data);
//   //...sometime later we try to read again from
//   //the same file
//   const reader2 = createFileReader("data.txt");
//   reader2.onDataReady((data) => {
//     console.log("Second call data:", data);
//   });
// });

// Revealing module pattern
const module2 = () => {
  const privateFoo = () => {};
  const privateVar = [];

  const exported = {
    publicFoo: () => {},
    publicVar: () => {},
  };

  return exported;
};

// Homemade module loader
const loadModule = (filename, module, require) => {
  const wrappedSrc =
    "(module, exports, require {" +
    fs.readFileSync(filename, "utf-8") +
    "}) (module, module.exports, require);";
  eval(wrappedSrc);
};

// Let's now see what these variables contain by implementing our require() function:
// const require = (moduleName) => {
//   console.log(`Require invoked for module: ${moduleName}`);
//   const id = require.resolve(moduleName); // resolve the full path of the module
//   if (require.cache[id]) {
//     return require.cache[id].exports; // return the cached module
//   }

//   //module metadata
//   const module = {
//     exports: {},
//     id: id,
//   };

  //Update the cache
//   require.cache[id] = module;

  //load the module
//   loadModule(id, module, require);

  //return exported variables
  return module.exports;
// };

// (require.cache = {}),
//   (require.resolve = (moduleName) => {
//     //resolve a full module id from the moduleName
//   });

// const dependency = require('./anotherModule.js');

dependency.username;

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
