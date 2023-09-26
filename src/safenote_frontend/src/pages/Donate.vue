<template>
    <Layout>
        <div class="donate">
            <h2 class="donate__heading">Donate</h2>
            <p class="donate__info">If you'd like to donate, you can use following cryptocurrency adresses:</p>
            <div class="donate__grid">
                <div class="donate__cell">
                    <div class="donate__logo-container">
                        <img class="donate__logo" src="monero-xmr-logo.svg" alt="Monero" />
                    </div>
                    <p class="donate__address"
                        @click="copyAddress(`43DgXLuB9GNJB7o4JDQvuXiCRkDByZ61eKWfqV2cqgZzFMaB6xa59wSiM8enGqmhyJ5rKtNxXfWMd4nxy2EGVCgy4hFBvZb`)">
                        43DgXLuB9GNJB7o4JDQvuXiCRkDByZ61eKWfqV2cqgZzFMaB6xa59wSiM8enGqmhyJ5rKtNxXfWMd4nxy2EGVCgy4hFBvZb</p>
                </div>
                <div class="donate__cell">
                    <div class="donate__logo-container">
                        <img class="donate__logo" src="bitcoin-btc-logo.svg" alt="Bitcoin" />
                    </div>
                    <p class="donate__address" @click="copyAddress(`17okXjSeXxauCBZZnhBRv4RsmVgS6qkkVP`)">
                        17okXjSeXxauCBZZnhBRv4RsmVgS6qkkVP</p>
                </div>
                <div class="donate__cell">
                    <div class="donate__logo-container">
                        <img class="donate__logo donate__logo-icp" src="internet-computer-icp-logo.svg" alt="ICP" />
                    </div>
                    <p class="donate__address"
                        @click="copyAddress(`7654b60f087963225ca3e52a29be24e50cdea2c60dbcf6a6a31365e2d1af25fc`)">
                        7654b60f087963225ca3e52a29be24e50cdea2c60dbcf6a6a31365e2d1af25fc</p>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import Notification from '@/components/Notification';

function copyAddress(address) {
    navigator.clipboard.writeText(address);
    Notification.show('Address copied!');
}
</script>

<style lang="scss">
.donate {
    text-align: center;
    max-width: 100%;

    &__heading {
        font-size: 3.2rem;
        margin-top: 5rem;
    }

    &__info {
        margin-top: 1.4em;
        font-family: $font-secondary;
        font-weight: 500;
    }

    &__logo {
        width: 6rem;
    }

    &__logo-icp {
        width: 6.6rem;
    }

    &__grid {
        margin-top: 4rem;
        display: flex;
        flex-direction: column;
        max-width: 100%;
        align-items: center;

        @media (min-width: $bp-md) {
            align-items: flex-start;
            margin-top: 6rem;
        }
    }

    &__cell {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        margin-top: 2.2rem;

        &:last-child {
            margin-top: 2.2rem;

            @media (min-width: $bp-md) {
                margin-top: 2.6rem;
            }
        }

        @media (min-width: $bp-md) {
            flex-direction: row;
            width: auto;
            align-items: center;

            margin-top: 2rem;
        }
    }

    &__logo-container {
        width: 100%;
        display: flex;
        justify-content: center;

        @media (min-width: $bp-md) {
            width: initial;
        }
    }

    &__address {
        cursor: pointer;
        overflow-wrap: break-word;
        max-width: 100%;
        text-align: left;
        margin-top: 1.6rem;

        @media (min-width: $bp-md) {
            width: 64rem;
            margin-top: 0;
            margin-left: 1.8rem;
        }
    }
}
</style>