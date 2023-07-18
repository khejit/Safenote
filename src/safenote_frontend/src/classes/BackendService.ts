import { HttpAgent } from "@dfinity/agent";

import SafenoteActor from './SafenoteActor';
import { canisterId1, canisterId2, canisterId3, idlFactory1, idlFactory2, idlFactory3 } from './SafenoteActor';

const isProduction = process.env.NODE_ENV === 'production',
    host = isProduction ? 'https://icp0.io' : undefined,
    agent = new HttpAgent({ host });

const backend_1 = new SafenoteActor(canisterId1, { agent }).create(idlFactory1),
    backend_2 = new SafenoteActor(canisterId2, { agent }).create(idlFactory2),
    backend_3 = new SafenoteActor(canisterId3, { agent }).create(idlFactory3);

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

    async handleSaveKey(backend: typeof safenote_backend_1 | typeof safenote_backend_2 | typeof safenote_backend_3, params) {
        try {
            return await retry3Times(backend.saveKey.bind(null, params.id, params.key), () => {
                this.successful.push(backend);
            });
        } catch {
            this.clearSuccessful(params.id);
            throw Error("Couldn't save note. Try again.");
        }
    }

    async handleReadKey(backend: typeof safenote_backend_1 | typeof safenote_backend_2 | typeof safenote_backend_3, id) {
        try {
            return await backend.readKey(id)
        } catch {
            throw Error("Couldn't read one or more keys from backend.")
        }
    }

    async readNoteKeys(id): Promise<string[]> {
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