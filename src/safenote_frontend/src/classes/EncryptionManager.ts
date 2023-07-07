import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import hex from 'crypto-js/enc-hex';
import utf8 from 'crypto-js/enc-utf8';
import cryptoRandomString from 'crypto-random-string';

export default class {
    masterKey: string;
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();

    constructor(keyLength) {
        this.masterKey = this.generateMasterKey(keyLength);
    }

    private generateMasterKey(length): string {
        const urlCompatibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'; // must be 64 optional url characters for below to work

        const baseArray = new Uint8Array(length);
        crypto.getRandomValues(baseArray);
        const key = baseArray.reduce((acc, i) => acc + urlCompatibleChars[Math.floor(i / 4)], "");
        return key;
    }

    setMasterKey(key) {
        this.masterKey = key
    }

    getMasterKey() {
        return this.masterKey
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
        const encryptedNote = this.aesEncrypt(noteText).toString(),
            key1 = cryptoRandomString({ length: encryptedNote.length }),
            key2 = cryptoRandomString({ length: encryptedNote.length });

        const key1bin = this.str2bin(key1),
            key2bin = this.str2bin(key2),
            encryptedNotebin = this.str2bin(encryptedNote);

        const keysXored = this.xor(this.str2bin(key1), this.str2bin(key2)),
            keysAndNoteXored = this.xor(keysXored, this.str2bin(encryptedNote));

        const stringKeysAndNoteXored = this.bin2str(keysAndNoteXored),
            encryptedMessageUnxored = this.bin2str(this.xor(keysAndNoteXored, keysXored));

        // debugger;

        return [key1, key2, this.bin2str(keysAndNoteXored)];
    }

    getMasterKeyHash() {
        return this.sha256(this.masterKey)
    }

    aesEncrypt(toEncrypt) {
        return aes.encrypt(toEncrypt, this.masterKey)
    }

    aesDecrypt(encrypted) {
        return aes.decrypt(encrypted, this.masterKey).toString(utf8)
    }

    private sha256(toHash) {
        return sha256(toHash).toString(hex);
    }
}