<template>
    <div v-html="templ"></div>
</template>

<script lang="ts">
import feather from 'feather-icons';

export default {
    props: {
        name: {
            type: String,
            required: true
        },
        size: Number,
        strokeWidth: Number
    },
    computed: {
        templ() {
            const size = this.size ? this.size : 24,
                strokeWidth = this.strokeWidth ? this.strokeWidth : 2;
            return feather.icons[this.name].toSvg(
                {
                    width: size, height: size,
                    "stroke-width": strokeWidth
                }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    @include flex-center;
    color: $brand;
    max-width: 100%;

    @media (min-width: $bp-sm) {
        // max-width: auto;
    }
}
</style>