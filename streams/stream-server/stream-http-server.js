import http from 'node:http';
import { Readable, Transform, Writable } from 'node:stream';

class NegateStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString() * -1);
        console.log(transformed);

        callback(null, Buffer.from(String(transformed)));
    }
};

class MultiplyByTwoStream extends Writable {

    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 2);
        callback();
    }
}

class PairStream extends Writable {

    _write(chunk, encoding, callback) {
        if (Number(chunk % 2 === 0)) {
            console.log(Number(chunk.toString()));
        }
        callback();
    }
}


const server = http.createServer((req, res) => {
    req.on('data', (chunk) => chunk)
        .pipe(new PairStream())
        .pipe(new NegateStream())
        .pipe(res)
});

server.listen(5000);