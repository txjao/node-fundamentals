import { Readable } from 'node:stream'

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

new OnToHundredStream().pipe(process.stdout);