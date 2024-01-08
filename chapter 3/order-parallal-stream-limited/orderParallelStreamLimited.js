import { Transform } from "stream";

export class LimitedParallelStreamOrdered extends Transform {
  constructor(concurrency, userTransform, opts) {
    super({ ...opts, objectMode: true });
    this.concurrency = concurrency;
    this.userTransform = userTransform;
    this.running = 0;
    this.continueCb = null;
    this.terminateCb = null;
    this.urlOrder = 0;
    this.buffer = [];
  }

  _transform(chunk, enc, done) {
    this.running++;
    const currentOrder = this.urlOrder++;
    this.buffer.push({ chunk, order: currentOrder });

    this.userTransform(
      { chunk: chunk.toString(), order: currentOrder },
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    );

    if (this.running < this.concurrency) {
      done();
    } else {
      this.continueCb = done;
    }
  }

  _flush(done) {
    if (this.running === 0) {
      this._completeFlush(done);
    } else {
      this.terminateCb = () => this._completeFlush(done);
    }
  }

  _completeFlush(done) {
    // Sort the results by order before pushing them
    this.buffer
      .sort((a, b) => a.order - b.order)
      .forEach(({ chunk, order }) => {
        this.userTransform(
          { chunk, order },
          null,
          this.push.bind(this),
          this._onComplete.bind(this)
        );
      });

    this.buffer = [];
    this.flushing = false;

    if (this.terminateCb) {
      this.terminateCb();
    }

    done();
  }

  _onComplete() {
    this.running--;

    if (this.running === 0 && this.terminateCb) {
      this.terminateCb();
    }

    if (this.continueCb) {
      this.continueCb();
    }
  }
}