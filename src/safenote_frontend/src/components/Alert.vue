<template>
    <div class="alert" :style="{'background-color':isQuestion?'#B0DCFF':'#FFEDAD'}">
        <div class="alert__icon-box" :style="{'background-color': isQuestion?'#34AFF7':'#FFD43A'}">
            <Icon :name="isQuestion ? 'help-circle':'alert-triangle'" size="32"></Icon>
        </div>
        <div class="alert__text-box">
            <slot>
                This note got destroyed
            </slot>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
    components: {
        Icon
    },
    props: {
        isQuestion: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.alert {
    margin-top: 20px;
    border-radius: 8px;
    border: 4px solid $brand;
    min-height: 64px;
    display: flex;
    align-items: stretch;
    font-size: 14px;

    &__icon-box {
        width: 60px;
        border-right: 4px solid $brand;
        border-radius: 4px 0 0 4px;
        @include flex-center;
    }

    &__text-box {
        padding: 13px 21px;
        line-height: 1.4;
        color: $brand;
        display: flex;
        align-items: center;
    }

    @media (min-width: $bp-sm) {
        font-size: 16px;

        &__icon-box {
            width: 64px;
        }

        &__text-box {
            padding: 21px 24px;
        }
    }
}
</style>