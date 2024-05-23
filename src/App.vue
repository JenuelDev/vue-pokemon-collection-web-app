<script setup>
import PokemonTable from "@/components/Pokemon/Table.vue";
import TopThree from "@/components/Pokemon/TopThree.vue";
</script>

<template>
    <div class="background">
        <div class="background-top"></div>
        <TopThree />
        <PokemonTable />
    </div>
</template>

<style lang="scss">
.background {
    position: relative;
    padding-top: 50px;

    .background-top {
        top: 0;
        position: absolute;
        height: 280px;
        width: 100%;
        background-color: #140626;
        z-index: -1;
    }
}
</style>
