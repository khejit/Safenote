import { defineStore } from 'pinia';
import { inject, computed, ref } from 'vue';

import type EncryptionManager from '@/classes/EncryptionManager';

export const useEncryptionStore = defineStore('encryption', () => {
    const encryptionManager = inject('EncryptionManager') as EncryptionManager;

    const masterKey = ref(encryptionManager.masterKey),
        masterKeyHash = computed(() => encryptionManager.getMasterKeyHash());

    function setMasterKey (key: string) {
        encryptionManager.setMasterKey(key);
    }

    function generateKeys (noteText: string) {
        return encryptionManager.generateNoteKeys(noteText)
    }

    function getNote(keys: string[]) {
        return encryptionManager.getNoteFromKeys(keys)
    }

    function resetMasterKey (){
        setMasterKey(encryptionManager.generateMasterKey())
    }

    return {
        masterKey,
        masterKeyHash,
        setMasterKey,
        resetMasterKey,
        generateKeys,
        getNote
    }
})