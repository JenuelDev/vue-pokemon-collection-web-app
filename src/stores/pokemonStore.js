import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonStore = defineStore("pokemonStore", () => {
    const LOADING = ref(false);
    const POKEMON_LIST = ref([]);
    const POKEMON_PAGINATION = ref({
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 0,
    });

    const getPokemonList = async () => {
        try {
            const limit = POKEMON_PAGINATION.value.rowsPerPage;
            const offset = (POKEMON_PAGINATION.value.page - 1) * limit;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

            POKEMON_PAGINATION.value.rowsPerPage = limit;
            POKEMON_PAGINATION.value.rowsNumber = response.data.count;

            return response.data.results;
        } catch (error) {
            console.error("Failed to fetch Pokémon list", error);
            throw error;
        }
    };

    const getPokemonDetails = async (pokemonUrl) => {
        try {
            const response = await axios.get(pokemonUrl);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch Pokémon details", error);
            throw error;
        }
    };

    const getListOfPokemonWithDetails = async () => {
        try {
            LOADING.value = true;
            const pokemonList = await getPokemonList();
            const detailedPokemonDataPromises = pokemonList.map((pokemon) => getPokemonDetails(pokemon.url));
            const detailedPokemonData = await Promise.all(detailedPokemonDataPromises);

            const processedPokemonData = detailedPokemonData.map((details) => {
                const name = details.name;
                const abilities = details.abilities.map((ability) => ability.ability.name);
                const types = details.types.map((type) => type.type.name);
                const baseStats = details.stats;
                const totalBaseStat = baseStats.reduce((acc, stat) => acc + stat.base_stat, 0);
                const frontImageFront = details.sprites.front_default;
                const weight = details.weight;

                return {
                    name,
                    abilities,
                    types,
                    baseStats,
                    totalBaseStat,
                    frontImageFront,
                    weight
                };
            });

            LOADING.value = false;
            POKEMON_LIST.value = processedPokemonData;
        } catch (error) {
            LOADING.value = false;
            console.error("An error occurred:", error);
        }
    };

    onMounted(() => {
        getListOfPokemonWithDetails();
    });

    return {
        POKEMON_LIST,
        POKEMON_PAGINATION,
        request: (data) => {
            console.log(data);
            POKEMON_PAGINATION.value.page = data.pagination.page;
            POKEMON_PAGINATION.value.rowsPerPage = data.pagination.rowsPerPage;
            getListOfPokemonWithDetails();
        },
        LOADING,
    };
});
