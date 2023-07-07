<script lang="ts">
import { defineStore } from 'pinia';
import { inject, computed} from 'vue';

import type EncryptionManager from '@/classes/EncryptionManager';

export const useEncryptionStore = defineStore('encryption', () => {
    const encryptionManager = inject('EncryptionManager') as EncryptionManager;

    const masterKey = computed(() => encryptionManager.getMasterKey(),),
        masterKeyHash = computed(() => encryptionManager.getMasterKeyHash());

    function setMasterKey (key: string) {
        encryptionManager.setMasterKey(key)
    }

    function generateKeys (noteText: string) {
        return encryptionManager.generateNoteKeys(noteText)
    }

    return {
        masterKey,
        masterKeyHash,
        setMasterKey,
        generateKeys
    }
})

export default {}
</script>