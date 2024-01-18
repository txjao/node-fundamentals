import { Readable, Transform, Writable } from 'node:stream'

class OnToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;
        const buff = Buffer.from(String(i + '\n'))

        setTimeout(() => {
            i > 100 ? this.push(null) : this.push(buff);
        }, 1000);
    }
}

class MultiplyByTwoStream extends Writable {

    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 2);
        callback();
    }
}

class NegateStream extends Transform {

    _transform(chunk, encoding, callback) {
        const transformed = (Number(chunk.toString() * -1));
        callback (null, Buffer.from(String(transformed)));
    }
}

new OnToHundredStream()
    .pipe(new NegateStream())
    .pipe(new MultiplyByTwoStream());