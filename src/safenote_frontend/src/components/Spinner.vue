<template>
    <div class="custom-loader"></div>
</template>

<style lang="scss">
.custom-loader {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 4px solid;
    animation: s2 1s infinite linear;
    
    border-color: $background-light;
    border-right-color: $dark;

    @media (min-width: $bp-sm) {
        width: 18px;
        height: 18px;
        border: 4px solid;
        
        border-color: $background-light;
        border-right-color: $dark;
    }
}

@keyframes s2 {
    to {
        transform: rotate(1turn)
    }
}
</style>