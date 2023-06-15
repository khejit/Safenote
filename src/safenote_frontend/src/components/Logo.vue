<template>
    <div class="logo">
        Safenote
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .logo {
        font-size: 1.2rem;
        width: 11.3rem;
        height: 3.6rem;
        border-radius: 0.3rem;
        background-color: $brand;
        color: $white;
        @include flex-center;

        @media (min-width: $bp-sm) {
            font-size: 1.6rem;
            width: 15rem;
            height: 4.8rem;
            border-radius: 0.4rem;
        }
    }
</style>