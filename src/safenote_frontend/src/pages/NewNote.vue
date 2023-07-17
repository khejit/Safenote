<template>
    <Layout>
        <div class="new-note">
            <form action="" method="post" class="new-note__form">
                <textarea :readonly="success" class="new-note__input" v-model="newNoteText"
                    placeholder="Your safe note goes here..." />
                <fieldset v-if="!success" class="new-note__buttons row">
                    <Button white @click.prevent="newNoteText = ''">
                        Clear text field
                    </Button>
                    <Button @click.prevent="saveNote">
                        <Spinner v-if="saving"></Spinner>
                        <template v-else>
                            Create note
                        </template>
                    </Button>
                </fieldset>
                <fieldset v-else class="new-note__buttons row">
                    <Button @click.prevent="copyLink">{{ copyLinkText }}</Button>
                </fieldset>
            </form>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Button from '@/components/Button.vue';
import Error from '@/components/Error';
import Spinner from '@/components/Spinner.vue';

import type BackendService from '@/classes/BackendService';

import { useEncryptionStore } from '@/store';
import { ref, inject, onMounted } from 'vue';

const backendService = inject('BackendService') as BackendService;

const newNoteText = ref<string>(''),
    store = useEncryptionStore(),
    saving = ref<boolean>(false),
    success = ref<boolean>(false),
    copyLinkText = ref<string>('Copy link');

onMounted(()=>{    
    store.resetMasterKey();
})

async function saveNote() {
    saving.value = true;

    if(newNoteText.value === '') {        
        Error.show("Note text can't be empty.");        
        saving.value = false;
        return false;
    }

    try {
        const keys = store.generateKeys(newNoteText.value),
            resultHashes = await backendService.saveNoteKeys(store.masterKeyHash, keys);

        if (resultHashes.every(hash => hash === store.masterKeyHash)) {
            showNoteLink()
        } else {
            handleGenericError()
        }
    } catch (e) {
        Error.show(e)
    }

    saving.value = false;
}

function copyLink() {
    navigator.clipboard.writeText(newNoteText.value);
    copyLinkText.value = 'Copied!';
    setTimeout(() => {
        copyLinkText.value = 'Copy link'
    }, 6 * 1000)
}

function showNoteLink() {
    newNoteText.value = window.location.href + store.masterKey;
    success.value = true;
}

function handleGenericError() {
    // newNoteText.value = '';
    success.value = false;
    store.resetMasterKey();
    Error.show();
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