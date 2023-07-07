<template>
    <Layout>
        <div class="new-note">
            <form action="" method="post" class="new-note__form">
                <textarea class="new-note__input" v-model="newNoteText" placeholder="Your safe note goes here..." />
                <fieldset class="new-note__buttons row">
                    <Button white>
                        Clear text field
                    </Button>
                    <Button @click.prevent="saveNote">Create note</Button>
                </fieldset>
            </form>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Button from '@/components/Button.vue';

import type BackendService from '@/classes/BackendService';

import { useEncryptionStore } from '@/store.vue';
import { ref, inject } from 'vue';

const backendService = inject('BackendService') as BackendService;

const newNoteText = ref(''),
    store = useEncryptionStore(),
    masterKeyHash = store.masterKeyHash;

async function saveNote() {
    const keys = store.generateKeys(newNoteText.value);
    await backendService.saveNoteKeys(masterKeyHash, keys);
}
</script>

<style lang="scss">
.new-note {
    margin: 32px auto;
    max-width: 100%;
    width: 80rem;

    &__form {
        font-size: 12px;
        width: 100%;
    }

    &__input {
        width: 100%;
        min-height: 172px;
        padding: 15px;
        border: 2px solid $outline-light;
        background: $background-light;
        resize: vertical;
        font-size: inherit;
    }

    &__buttons {
        margin-top: 14px;
    }

    @media (min-width: $bp-sm) {
        &__form {
            font-size: 16px;
        }

        &__input {
            padding: 20px;
        }
    }
}
</style>