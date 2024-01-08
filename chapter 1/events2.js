const  EventEmitter  = require('stream');
const util = require('util');
const {glob} = require('glob')


// function SyncEmit() {
//     this.emit('ready');
// }
// util.inherits(SyncEmit, EventEmitter);

// const syncEmit = new SyncEmit();
// syncEmit.on('ready', function() {
//     console.log('Object is ready to be used'); // not printed it was never invoked
// })

// function helloEvents  ()  {
//     const eventEmitter = new EventEmitter();
//     setTimeout(function()  {
//         eventEmitter.emit('hello', 'world');
//     },100);
//     return eventEmitter;
//     function helloCallback  (callback) {
//         setTimeout(() => {
//             callback('hello', 'world')
//         },1000)
//     }
    
// }

// const {glob} = require('glob');

// glob('data/.txt', (error, files) => {
//     console.log('File found: ', JSON.stringify(files))

// }).then('match', match => {
//     console.log('Match ', + match)
// })


// glob('data/.txt', (error, files) => {
//     console.log('All files found: ', + JSON.stringify(files));
// }).on('match', match => {
//     console.log('Match found: ' + match)
// })

glob('./data/*.txt', (error, files) => {
    if(error) {
        console.error('Error', error)
        return;
    }

    console.log('All files found: ', JSON.stringify(files))

    files.forEach(match => {
        console.log('Match found: ', match)
    })
})

function createEVentEmitter (callback) {
    const eventEmitter =  new EventEmitter();

    // Etnry point event
    eventEmitter.on('start', () => {
        console.log('Main functionality started');
        if(callback) {
            callback()
        }
    });

    // Fine-grained events
    eventEmitter.on('processStep1', () => {
        console.log('Processing step 1');
    })

    eventEmitter.on('processStep1', () => {
        console.log('Processing step 2');
    })

    // Another fine-grained event
    eventEmitter.on('finish', () => {
        console.log('Main functionality finished');
    })

    return eventEmitter;
}

const myEventEmitter = createEVentEmitter(() => {
    console.log('Callback executed')
})

myEventEmitter.emit('start')
myEventEmitter.emit('processStep1')
myEventEmitter.emit('processStep2')
myEventEmitter.emit('finish')