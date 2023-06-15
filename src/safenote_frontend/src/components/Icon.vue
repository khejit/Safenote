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
        size: Number
    },
    computed: {
        templ() {
            return feather.icons[this.name].toSvg(
                {
                    width: this.size ? this.size : 24, height: this.size ? this.size : 24
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
    max-width: 24px;

    @media (min-width: $bp-sm) {
        max-width: auto;
    }
}
</style>