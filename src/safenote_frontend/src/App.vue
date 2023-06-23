<template>
    <router-view />
</template>

<script setup lang="ts">
import {provide} from 'vue';
import BackendService from '@/classes/BackendService';
import EncryptionManager from '@/classes/EncryptionManager';
import { useEncryptionStore } from '@/store.vue';


provide('BackendService', new BackendService());

const EncryptionManagerInstance = new EncryptionManager(10);
provide('EncryptionManager', EncryptionManagerInstance);

const store = useEncryptionStore();
store.setEncryptionManager(EncryptionManagerInstance);
</script>

<style lang="scss">
@import "@/scss/main.scss";
</style>