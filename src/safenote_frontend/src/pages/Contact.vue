<template>
    <Layout>
        <div class="contact">
            <Icon name="mail" :size="37"></Icon>
            <p>If you want to contact me with anything regarding Safenote, please open <a target="_blank" href="https://github.com/khejit/Safenote/issues">a new issue on Github.</a></p>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
</script>

<style lang="scss">
.contact {
    border: 2px solid $outline-light;
    border-radius: $border-radius-default;
    width: 72rem;
    max-width: 100%;
    min-height: 17.2rem;    
    padding: 2rem 3rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        max-width: 40rem;
        text-align: center;
        line-height: 1.45;
        margin-top: 1.8rem;
        font-family: Roboto, sans-serif;
        font-weight: 400;
    }

    @media (min-width: $bp-sm) {
        padding: 3.6rem 5.4rem;
        margin-top: 6rem;
    }
}
</style>