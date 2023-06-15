<template>
    <div class="layout">
        <Header class-names="layout__header" />
        <main class="layout__main">
            <slot />
        </main>
        <Footer class-names="layout__footer" />
    </div>
</template>

<script>
import Header from './Header';
import Footer from './Footer';

export default {
    components: {
        Header, Footer
    }
}
</script>

<style lang="scss">
.layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        'header'
        'main'
        'footer';
    min-height: 100vh;

    &__header {
        grid-area: header;
    }

    &__main {
        @extend %layout-padding-default;
        grid-area: main;
        max-width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 6rem;

        @media (min-width: $bp-md) and (min-height: 624px) {
            margin-bottom: 8rem;
        }

        @media (min-width: $bp-md) and (min-height: 1080px) {
            margin-bottom: 18rem;
        }
    }

    &__footer {
        grid-area: footer;
    }
}
</style>