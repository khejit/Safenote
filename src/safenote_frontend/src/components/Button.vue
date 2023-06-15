<template>
    <button class="button" :class="{ 'button--white': white }">
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    props: {
        white: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.button {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 5px;
    background-color: $background-dark;
    color: $white;
    font-weight: 700;

    &--white {
        padding: 12px 16px;
        background-color: $white;
        border: 2px solid $outline-dark;
        color: $dark;
    }

    @media (min-width: $bp-sm) {
        border-radius: 6px;
        font-size: 16px;
    }
}
</style>