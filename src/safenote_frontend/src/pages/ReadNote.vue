<template>
    <Layout>
        <div class="read-note">
            <template v-if="!isConfirmed">
                <Heading>Confirmation</Heading>
                <Alert is-question>Are you sure you want to read and destroy the note?</Alert>
                <div class="row read-note__buttons">
                    <Button white small>
                        No
                    </Button>
                    <Button @click="readNote">Yes</Button>
                </div>
            </template>
            <template v-else>
                <NoteLoader v-if="!isLoaded" />
                <template v-else>
                    <Heading>This is your note</Heading>
                    <textarea readonly :value="noteText" ref="noteField" class="read-note__note-field"></textarea>
                    <Alert></Alert>
                </template>
            </template>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Button from '@/components/Button.vue';
import Heading from '@/components/Heading.vue';
import Alert from '@/components/Alert.vue';
import NoteLoader from '@/components/NoteLoader.vue';

import type BackendService from '@/classes/BackendService';

import { useEncryptionStore } from '@/store.vue';
import { nextTick, inject, ref, onMounted } from 'vue';

import { useRoute } from 'vue-router';

const store = useEncryptionStore();
const backendService = inject('BackendService') as BackendService;

const noteField = ref(null);

let isConfirmed = ref(false),
    isLoaded = ref(false),
    noteText = ref(``);

onMounted(()=>{
    const route = useRoute(),
        masterKey: string = route.params.pathMatch.at(-1);

    store.setMasterKey(masterKey);
});

async function readNote() {
    isConfirmed.value = true;
    const keys = await backendService.readNoteKeys(store.masterKeyHash),
        note = store.getNote(keys);

    noteText.value = note;
    isLoaded.value = true;
    await nextTick();
    matchNoteHeight();
};

function matchNoteHeight() {
    const noteFieldVal = noteField.value as HTMLTextAreaElement;
    noteFieldVal && (noteFieldVal.style.height = noteFieldVal.scrollHeight + 30 + "px");
};
</script>

<style lang="scss">
.read-note {
    width: 64rem;
    max-width: 100%;
    margin: 32px auto;

    &__note-field {
        width: 100%;
        min-height: 136px;
        padding: 20px;
        border: 2px solid $outline-light;
        background: $background-light;
        font-size: 14px;
        line-height: 1.5;
        color: $brand;
        resize: vertical;
        font-family: $font-main;
        border-radius: $border-radius-default 0 0 $border-radius-default;
    }

    &__buttons {
        margin-top: 20px;
    }

    @media (min-width: $bp-sm) {
        &__note-field {
            font-size: 16px;
        }
    }
}
</style>