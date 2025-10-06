<script setup>
</script>

<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>

    .container{
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: white;
        box-shadow: 5px 8px 21px rgba(0,0,0,0.2);
        padding: 20px;
        border-radius: 20px;
        gap: 20px;
        width: auto;
        /* min-width: 388px; */

        @media (max-width: 768px) {    
            width: 90vw;
            height: auto;
        }
    }
</style>
