import { safenote_backend_1 } from "@/../../declarations/safenote_backend_1";
import { safenote_backend_2 } from "@/../../declarations/safenote_backend_2";
import { safenote_backend_3 } from "@/../../declarations/safenote_backend_3";

export default class {
    constructor() {

    }

    async readNoteKeys(id): string[] {
        const response = await Promise.all(safenote_backend_1.read_key(id), safenote_backend_2.read_key(id), safenote_backend_3.read_key(id));
        return response;
    }

    async saveNoteKeys(id, keys: string[]) { // if inserting under key fails on any backend container, generate new key and try again, try 3 times total, then tell the user
        // const numOfRetries = 3;
        const response = await Promise.all([safenote_backend_1.saveKey(id, keys[0]), safenote_backend_2.saveKey(id, keys[1]), safenote_backend_3.saveKey(id, keys[2])]);
        return response;
    }

}