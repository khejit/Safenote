<template>
    <header class="header" :class="classNames">
        <div class="header__inner">
            <Logo />
        </div>
    </header>
</template>

<script lang="ts">
import Logo from "./Logo.vue";

export default {
    components: {
        Logo
    },
    props: ['classNames']
}
</script>

<style lang="scss">
.header {
    border-bottom: 2px solid $brand;
    @extend %layout-padding-default;
    padding-top: 24px;
    padding-bottom: 24px;
    @include flex-center;

    &__inner {
        max-width: $max-width-default;
        width: 100%;
    }
}
</style>