<template>
    <Layout>
        <div class="new-note">
            <form action="" method="post" class="new-note__form">
                <textarea class="new-note__input" placeholder="Your safe note goes here..." />
                <fieldset class="new-note__buttons row">
                    <Button white>
                        Clear text field
                    </Button>
                    <Button>Create note</Button>
                </fieldset>
            </form>
        </div>
    </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import Button from '@/components/Button.vue';

export default {
    components: {
        Layout, Button
    }
}
</script>

<style lang="scss">
.new-note {
    margin: 32px auto;
    max-width: 100%;
    width: 80rem;

    &__form {
        font-size: 12px;
        width: 100%;
    }

    &__input {
        width: 100%;
        min-height: 172px;
        padding: 15px;
        border: 2px solid $outline-light;
        background: $background-light;
        resize: vertical;
        font-size: inherit;
    }

    &__buttons {
        margin-top: 14px;
    }

    @media (min-width: $bp-sm) {
        &__form {
            font-size: 16px;
        }

        &__input {
            padding: 20px;
        }
    }
}
</style>