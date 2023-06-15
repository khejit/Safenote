<template>
    <div class="note-loader">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss">
.note-loader {
    width: 100%;
    min-height: 136px;
    padding: 20px;
    border: 2px solid $outline-light;
    background: $background-light;
    font-size: 16px;
    line-height: 1.5;
    color: $brand;
    resize: vertical;
    font-family: $font-main;
    border-radius: $border-radius-default;

    >div {
        background-color: $grey;
        height: 16px;
        border-radius: 3px;
        animation: glow 2.5s infinite ease-in-out;

        &:first-child {
            width: 100%;
        }

        &:not(:first-child) {
            margin-top: 8px;
        }

        &:nth-child(2) {
            width: 100%;
        }

        &:nth-child(3) {
            width: 66.66%;
        }
    }

    @keyframes glow {
        0% {
            opacity: 0.4;
        }

        50% {
            opacity: 1;
        }

        100% {
            opacity: 0.4;
        }
    }

}
</style>