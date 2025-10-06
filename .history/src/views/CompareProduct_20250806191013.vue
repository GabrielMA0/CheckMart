<script setup>
import Container from '../components/Container.vue'
import Subtitle from '../components/Subtitle.vue'
import Input from '../components/Input.vue'
</script>

<template>
    <Container>
        <Subtitle>Comparar produtos</Subtitle>
        <div>
            <div>
            <span>Produto 01</span>
            <div>
                <Input/>
                <Input/>
            </div>
        </div>
        <div>
            <span>Produto 01</span>
            <div>
                <Input/>
                <Input/>
            </div>
        </div>
        </div>
    </Container>
</template>

<style lang="scss">
</style>
