import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import hex from 'crypto-js/enc-hex';
import utf8 from 'crypto-js/enc-utf8';

import urlCompatibleChars from '@/helpers/urlCompatibleChars';

export default class {
    masterKey: string;

    constructor(keyLength: Number){
        this.masterKey = this.generateKey(keyLength)
        console.log(this.masterKey)
    }

    generateKey (length): string {
        const chars = urlCompatibleChars;
        let result = '';
        let counter = 0;
        while (counter < length) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
            counter += 1;
        }
        return result;
    }

    getKey () {
        return this.masterKey
    }

    getKeyHash () {
        return this.sha256(this.masterKey)
    }

    aesEncrypt (toEncrypt) {
        return aes.encrypt(toEncrypt, this.masterKey)
    }

    aesDecrypt(encrypted) {
        return aes.decrypt(encrypted, this.masterKey).toString(utf8)
    }

    sha256 (toHash) {
        return sha256(toHash).toString(hex);
    }
}