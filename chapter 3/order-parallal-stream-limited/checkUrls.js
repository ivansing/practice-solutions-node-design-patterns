import {createReadStream, createWriteStream} from 'fs';
import {pipeline} from 'stream';
import split from 'split';
import superagent from 'superagent';
import {LimitedParallelStreamOrdered} from './orderParallelStreamLimited.js';

pipeline(
    createReadStream(process.argv[2]),
    split(),
    new LimitedParallelStreamOrdered(
      4,
      async (chunk, enc, push, done) => {
        if (!chunk) {
          return done();
        }
        console.log(chunk.chunk);
        try {
          await superagent.head(chunk.chunk, { timeout: 5 * 1000 });
          push(`${chunk.chunk} is up\n`);
        } catch (err) {
          push(`${chunk.chunk} is down\n`);
        }
        done();
      }
    ),
    createWriteStream('results.txt'),
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log('All urls have been checked');
    }
  );

