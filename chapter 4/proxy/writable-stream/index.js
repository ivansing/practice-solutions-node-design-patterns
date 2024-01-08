import {createWriteStream} from 'fs';
import { createLoggingWritable } from './logging-writable.js';

const writable = createWriteStream('test.txt');
const writableProxy = createLoggingWritable(writable);

writableProxy.write('First chunk\n'); 
writableProxy.write('Second chunk\n');
writable.write('This is not logged')
writableProxy.end();