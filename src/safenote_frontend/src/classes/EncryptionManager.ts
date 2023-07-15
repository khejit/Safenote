import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import hex from 'crypto-js/enc-hex';
import utf8 from 'crypto-js/enc-utf8';
import cryptoRandomString from 'crypto-random-string';

import { ref } from 'vue';
import curry from '@/helpers/curry';

export const defaultKeyLength = 10;

export default class {
    masterKey = ref<string>('');
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();

    constructor() {
        
    }

    generateMasterKey(length = defaultKeyLength): string {
        const urlCompatibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'; // must be 64 optional url characters for below to work

        const baseArray = new Uint8Array(length);
        crypto.getRandomValues(baseArray);
        const key = baseArray.reduce((acc, i) => acc + urlCompatibleChars[Math.floor(i / 4)], "");
        return key;
    }

    setMasterKey(key) {
        this.masterKey.value = key;
    }

    private str2bin(str) {
        return this.textEncoder.encode(str)
    }

    private bin2str(bin) {
        return this.textDecoder.decode(bin)
    }

    private xor(a, b) {
        let res = new Uint8Array(Math.min(a.length, b.length));
        for (let i = 0; i < a.length && i < b.length; i++) {
            res[i] = a[i] ^ b[i];
        };
        return res;
    }

    generateNoteKeys(noteText): string[] {
        const curriedXor = curry(this.xor);

        const encryptedNote = this.aesEncrypt(noteText).toString(),
            key1 = cryptoRandomString({ length: encryptedNote.length }),
            key2 = cryptoRandomString({ length: encryptedNote.length });

        const keysAndNoteXored = curriedXor([key1, key2, encryptedNote].map(k=>this.str2bin(k)));

        return [key1, key2, this.bin2str(keysAndNoteXored)];
    }

    getNoteFromKeys(keys) {
        const curriedXor = curry(this.xor);

        const xored = curriedXor(keys.map(key=>this.str2bin(key))),
            xoredToString = this.bin2str(xored),
            decrypted = this.aesDecrypt(xoredToString);

        return decrypted;
    }

    getMasterKeyHash() {
        return this.sha256(this.masterKey.value)
    }

    aesEncrypt(toEncrypt) {
        // todo: wrap in try catch
        return aes.encrypt(toEncrypt, this.masterKey.value)
    }

    aesDecrypt(encrypted) {
        // todo: wrap in try catch
        return aes.decrypt(encrypted, this.masterKey.value).toString(utf8)
    }

    private sha256(toHash) {
        return sha256(toHash).toString(hex);
    }
}