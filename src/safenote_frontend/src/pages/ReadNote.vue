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
                    <textarea readonly :value="noteText" ref="note-field" class="read-note__note-field"></textarea>
                    <Alert></Alert>
                </template>
            </template>
        </div>
    </Layout>
</template>

<script >
import Layout from '@/components/Layout.vue';
import Button from '@/components/Button.vue';
import Heading from '@/components/Heading.vue';
import Alert from '@/components/Alert.vue';
import NoteLoader from '@/components/NoteLoader.vue';

import aesjs from "aes-js";
import aes from 'crypto-js/aes'
import utf8 from 'crypto-js/enc-utf8'

import { nextTick } from 'vue';

export default {
    components: {
        Layout, Button, Heading, Alert, NoteLoader
    },
    async mounted() {
        function makeUrl(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        }

        const url = makeUrl(10);
        console.log(url);

        
        var text = 'Some secret note to encrypt with key 💁👌🎍😍.';

        const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("url")),
        hashArray = Array.from(new Uint8Array(hashBuffer));

        
        // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
        var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

        // Convert text to bytes
        var textBytes = aesjs.utils.utf8.toBytes(encodeURIComponent(text));

        // The counter is optional, and if omitted will begin at 1
        var aesCtr = new aesjs.ModeOfOperation.ctr(hashArray, new aesjs.Counter(5));
        var encryptedBytes = aesCtr.encrypt(textBytes);

        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        console.log(encryptedHex);

        // When ready to decrypt the hex string, convert it back to bytes
        var encryptedBytes2 = aesjs.utils.hex.toBytes(encryptedHex);

        // The counter mode of operation maintains internal state, so to
        // decrypt a new instance must be instantiated.
        var aesCtr2 = new aesjs.ModeOfOperation.ctr(hashArray, new aesjs.Counter(5));
        var decryptedBytes = aesCtr2.decrypt(encryptedBytes2);

        // Convert our bytes back into text
        var decryptedText = decodeURIComponent(aesjs.utils.utf8.fromBytes(decryptedBytes));
        console.log(decryptedText);
        this.noteText = decryptedText;
    },
    data() {
        return {
            isConfirmed: false,
            isLoaded: false,
            noteText: `Unde et velit iste. Ad autem maxime voluptatem repellendus quo. Quas voluptatem dignissimos est.

Et nihil repellendus officia labore magnam. Assumenda earum at voluptatibus ut quia. Rerum eum hic consectetur quidem quo et.

Vel sapiente qui nesciunt corporis et enim. Et veritatis a omnis repellat rerum odio. Dolor eius vero quia quod facilis optio tempore. Sint enim expedita quas distinctio accusantium. Dolor et sunt quia.

Enim corrupti sit et. Voluptas quam placeat quam saepe ut sit. Eos tempora voluptatum nobis suscipit. Quaerat totam quia natus aut et dolores et dolores. Delectus omnis magni aspernatur. Sit neque a qui dolorum quisquam assumenda.`
        }
    },
    methods: {
        async readNote() {
            this.isConfirmed = true;
            await nextTick();
            setTimeout(async () => {
                this.isLoaded = true;
                await nextTick();
                this.matchNoteHeight();
            }, 2500);
        },
        matchNoteHeight() {
            const noteField = this.$refs["note-field"];
            noteField && (noteField.style.height = noteField.scrollHeight + 30 + "px");
        }
    }
}
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