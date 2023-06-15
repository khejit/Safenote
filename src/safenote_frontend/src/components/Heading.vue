<template>
    <h2 class="heading">
        <slot></slot>
    </h2>
</template>

<style lang="scss">
    .heading {
        font-family: $font-main;
        font-size: 18px;
        line-height: 1.4;
        margin-bottom: 16px;

        @media (min-width: $bp-sm) {
            font-size: 20px;
        }
    }
</style>