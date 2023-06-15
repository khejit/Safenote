<template>
    <footer class="footer" :class="classNames">
        <div class="footer__inner">
            <Logo></Logo>
            <div class="footer__bottom-row bottom-row">
                <div class="bottom-row__left">Built for <a target="_blank" href="https://internetcomputer.org/">Internet
                        Computer</a>
                    {{ year }}</div>
                <div class="bottom-row__right">
                    <ul class="bottom-row__links links">
                        <li class="links__item"><router-link to="/privacy-policy">Privacy Policy</router-link></li>
                        <li class="links__item"><router-link to="/donate">Donate</router-link></li>
                        <li class="links__item"><router-link to="/contact">Contact</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import Logo from "@/components/Logo.vue";

export default {
    components: { Logo },
    props: ["classNames"],
    computed: {
        year() {
            return new Date().getFullYear();
        }
    }
}
</script>

<style lang="scss">
.footer {
    @extend %layout-padding-default;
    padding-top: 48px;
    padding-bottom: 48px;
    @include flex-center;
    margin: 0;
    background-color: $background-dark;

    &__inner {
        width: 100%;
        max-width: $max-width-default;
    }

    &__bottom-row {
        margin-top: 32px;
    }

    @media (min-width: $bp-sm) {
        padding-top: 64px;
        padding-bottom: 64px;
    }
}

.bottom-row {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 400;

    a {
        text-decoration: none;
    }

    &__left {
        color: $white;

        a {
            position: relative;

            &:after {
                content: '';
                position: absolute;
                height: 1px;
                width: 100%;
                background-color: $white;
                bottom: -0.3em;
                left: 0;
                opacity: 0.75;
            }
        }
    }

    &__right {
        color: $grey;

        a {
            &:hover {
                text-decoration: underline;
            }
        }
    }

    @media (min-width: $bp-sm) {
        flex-direction: row;
        justify-content: space-between;
    }
}

.links {
    display: flex;
    flex-direction: column;
    margin-top: 60px;

    &__item {
        &:not(:first-child) {
            margin-top: 24px;
        }
    }

    @media (min-width: $bp-sm) {
        flex-direction: row;
        margin-top: 0;

        &__item {
            &:not(:first-child) {
                margin-top: 0;
                margin-left: 32px;
            }
        }
    }
}
</style>