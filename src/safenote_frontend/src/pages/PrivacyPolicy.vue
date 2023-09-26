<template>
    <Layout>
        <div class="privacy-policy">
            <h1>Privacy Policy</h1>

            <p>Keeping your privacy is Safenote's core mission. This policy explains the measures we employ to ensure the
                protection of our users' privacy.</p>

            <p>1. Service Overview</p>
            <p>
                Safenote is a free service that lets users to create encrypted notes, which can be shared via unique
                one-time-use links. After accessing the link via any web browser, user can choose to read and destroy the
                note.</p>

            <p>Safenote does not facilitate transmission of the link; it is entirely the responsibility of the Safenote
                users. Links can be shared on any chosen communication channel (e.g., email, fax, SMS, phone, instant
                messaging, social media). Users should choose carefully which channel they trust, as any party in possession
                of the link, is able to read and destroy the note.</p>

            <p>2. Note Processing and Security</p>
            <p>
                Upon saving, the note is encrypted and split into three parts, each needed to decrypt it later. Each one
                part of the note is saved on one Safenote backend.</p>

            <p>The link is generated within the user's browser and is never sent to Safenote's backend. Consequently, the
                link remains solely in the sender's (and potentially the recipient's) possession. If a Safenote user loses
                the link, there is no means to recover the note.</p>

            <p>Once a user chooses to retrieve the note, three of its parts are pulled from backends and immediately purged
                from Safenote's system, rendering the note irretrievable.</p>

            <p>Since only the link contains the decryption key to the note's content, and because Safenote never retains the
                link, no note is stored in a readable format on our backends. This ensures that no one, including Safenote's
                administrators, can access or read a note.</p>

            <p>Instance hosted under safenote.store domain uses different Internet Computer subnet for each of three
                Safanote backends. This means that malicious third-party actor would have to be in control not of one, not
                two, but three Internet Computer subnets and also be in possession of key from note's link, to spy into
                contents of the note without destroying it.</p>

            <p>3. Pseudonymous Data</p>
            <p>
                Safenote does not store any data targeting its users, ensuring that the note's creator cannot be identified
                from Safenote's database.</p>

            <p>4. Contents of users notes</p>
            <p>
                Safenote disclaims any responsibility for the content of notes. It has no capacity to check or verify it.
            </p>

            <p>5. Data Disclosure to Third Parties</p>
            <p>
                Safenote does not share, sell, or use user information in any manner not explicitly stated in this Privacy
                Policy.</p>

            <p>6. Use of Cookies</p>
            <p>
                Safenote uses only Internet Computer-specific cookies which are used to ensure proper working of Internet
                Computer system.</p>

            <p>Users have the option to manage or block certain cookies via their browser settings, but this may affect site
                functionality.</p>

            <p>7. Administration</p>
            <p>If you have any complaints or have issues, you can check out <a target="_blank" href="https://github.com/khejit/Safenote">Safenote's Github</a>.</p>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue';
</script>

<style lang="scss">
.privacy-policy {
    margin: 32px auto;
    max-width: 100%;
    width: 80rem;

    padding-top: 1.4rem;

    font-family: $font-secondary;
    font-weight: 500;
    
    @media (min-width: $bp-sm) {
        padding-top: 3rem;
    }

    h1 {
        margin-bottom: 2.4em;
    }

    p {
        &:not(:last-child){
            margin-bottom: 1.2em;
        }
    }
}</style>