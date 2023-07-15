import { safenote_backend_1 } from "@/../../declarations/safenote_backend_1";
import { safenote_backend_2 } from "@/../../declarations/safenote_backend_2";
import { safenote_backend_3 } from "@/../../declarations/safenote_backend_3";

const backend_1 = safenote_backend_1,
    backend_2 = safenote_backend_2,
    backend_3 = safenote_backend_3;

const backends = [backend_1, backend_2, backend_3];


import { retry } from '@/helpers/retry';
const retry3Times = retry(3);


export default class {
    successful = []

    constructor() {

    }

    async clearSuccessful(id) {
        this.successful.forEach(backend => {
            try { // silently try to delete key
                backend.readKey(id)
            } catch { }
        })
        this.successful = []
    }

    async handleSaveKey(backend: safenote_backend_1 | safenote_backend_2 | safenote_backend_3, params) {
        try {
            return await retry3Times(backend.saveKey.bind(null, params.id, params.key), () => {
                this.successful.push(backend);
            });
        } catch {
            this.clearSuccessful(params.id);
        }
    }

    async handleReadKey(backend: safenote_backend_1 | safenote_backend_2 | safenote_backend_3, id) {
        try {
            return await backend.readKey(id)
        } catch {
            // todo: notify user there was error, clear the app state
            throw Error("Couldn't read one or more keys from backend.")
        }
    }

    async readNoteKeys(id): string[] {
        const responses = await Promise.all(backends.map(b => this.handleReadKey(b, id)));
        return responses;
    }

    async saveNoteKeys(id, keys: string[]) {
        const responses = await Promise.all(backends.map((b, i) => this.handleSaveKey(b, {
            id,
            key: keys[i]
        })));
        this.successful = [];
        return responses;
    }

}