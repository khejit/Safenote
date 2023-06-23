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

import type EncryptionManager from '@/classes/EncryptionManager';

import { useEncryptionStore } from '@/store.vue';
import { nextTick, inject, ref, onMounted } from 'vue';

const store = useEncryptionStore(),
    masterKey = store.key,
    encryptionManager = inject('EncryptionManager') as EncryptionManager;

const noteField = ref(null);

let isConfirmed = ref(false),
    isLoaded = ref(false),
    noteText = ref(`Unde et velit iste. Ad autem maxime voluptatem repellendus quo. Quas voluptatem dignissimos est.

Et nihil repellendus officia labore magnam. Assumenda earum at voluptatibus ut quia. Rerum eum hic consectetur quidem quo et.

Vel sapiente qui nesciunt corporis et enim. Et veritatis a omnis repellat rerum odio. Dolor eius vero quia quod facilis optio tempore. Sint enim expedita quas distinctio accusantium. Dolor et sunt quia.

Enim corrupti sit et. Voluptas quam placeat quam saepe ut sit. Eos tempora voluptatum nobis suscipit. Quaerat totam quia natus aut et dolores et dolores. Delectus omnis magni aspernatur. Sit neque a qui dolorum quisquam assumenda.`);

onMounted(()=>{
    var text = 'Some secret note to encrypt with key 💁👌🎍😍.';

    const encrypted = encryptionManager.aesEncrypt(text),
        decrypted = encryptionManager.aesDecrypt(encrypted);

    const test = masterKey;
    console.log(test);

    noteText.value = decrypted;
});

async function readNote() {
    isConfirmed.value = true;
    await nextTick();
    setTimeout(async () => {
        isLoaded.value = true;
        await nextTick();
        matchNoteHeight();
    }, 2500);
};

function matchNoteHeight() {
    const noteFieldVal = noteField.value;
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