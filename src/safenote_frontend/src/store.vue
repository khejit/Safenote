<script lang="ts">
import { defineStore } from 'pinia';
import {ref, computed} from 'vue';
import type EncryptionManager from '@/classes/EncryptionManager';

export const useEncryptionStore = defineStore('encryption', () => {
    let encryptionManager: EncryptionManager = ref(null);

    function setEncryptionManager(instance: EncryptionManager) {
        encryptionManager = instance
    };

    const key = computed(() => encryptionManager.getKey(),)

    return {
        key,
        setEncryptionManager
    }
})

export default {}
</script>