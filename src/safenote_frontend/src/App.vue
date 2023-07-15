<template>
    <router-view />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import BackendService from '@/classes/BackendService';
import EncryptionManager from '@/classes/EncryptionManager';

provide('BackendService', new BackendService());

const EncryptionManagerInstance = new EncryptionManager();
provide('EncryptionManager', EncryptionManagerInstance);

</script>

<style lang="scss">
@import "@/scss/main.scss";
</style>