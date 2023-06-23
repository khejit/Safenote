import { safenote_backend_1 } from "@/../../declarations/safenote_backend_1";
import { safenote_backend_2 } from "@/../../declarations/safenote_backend_2";
import { safenote_backend_3 } from "@/../../declarations/safenote_backend_3";

export default class {
    constructor(){
        
    }

    async readNoteKeys(id){
        const response = await safenote_backend_1.read_key(id);
        console.log(response);
    }

    async saveNoteKeys(id, text){ // if inserting under key fails on any backend container, generate new key and try again, try 3 times total, then tell the user
        const response = await safenote_backend_1.saveKey(id, text);
        console.log(response)
    }
}