// Recebe dados de uma stream de leitura e faz algo com eles 
import { Readable, Writable } from 'node:stream'

class OneToHundredstream extends Readable {
    index = 1

    // Método Read
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString())* 10)
        callback()
    }

}

new OneToHundredstream()
    .pipe(new MultiplyByTenStream())
