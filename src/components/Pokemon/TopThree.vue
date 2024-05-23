<script setup>
import Rayquazad from "@/assets/images/rayquaza.png";
import Groudon from "@/assets/images/groudon.png";
import Dodrio from "@/assets/images/dodrio.png";

const topThree = [
    {
        name: "Mega Rayquaza",
        image: Rayquazad,
    },
    {
        name: "Primal Groudon",
        image: Groudon,
    },
    {
        name: "Dodrio",
        image: Dodrio,
    },
];
</script>
<template>
    <div class="pokemon-top-three-container">
        <div style="font-size: 48px; font-weight: 700; margin-bottom: 30px; color: white">Top 3 Pokemon</div>
        <div class="pokemon-top-three">
            <div v-for="(pokemon, i) in topThree">
                <span>Top {{ i + 1 }}</span>
                <h3>{{ pokemon.name }}</h3>
                <img :src="pokemon.image" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.pokemon-top-three-container {
    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
}

.pokemon-top-three {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    flex-wrap: wrap;

    & > div {
        width: 300px;
        height: 280px;
        border: 1px solid #1406261a;
        background: #fff;
        padding: 30px;
        border-radius: 12px;

        span {
            font-size: 20px;
            line-height: 42px;
            letter-spacing: -2%;
            color: #5c5665;
        }
        h3 {
            margin: 0;
            font-size: 30px;
            font-weight: 700;
            letter-spacing: -4%;
        }
        img {
            text-align: center;
            height: 150px;
        }
    }
}
</style>
