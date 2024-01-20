import http from 'node:http';
import { Transform, Writable } from 'node:stream';

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


const server = http.createServer((req, res) => {
    req.on('data', (chunk) => chunk)
        .pipe(new NegateStream())
        .pipe(new MultiplyByTwoStream())
        .pipe(res)
});

server.listen(3334);