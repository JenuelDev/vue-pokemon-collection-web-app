<script setup>
import { usePokemonStore } from "@/stores/pokemonStore";
import { format } from "quasar";
import { h, onMounted, ref } from "vue";
import { QBtn } from "quasar";

const pokemonStore = usePokemonStore();

const columns = [
    {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: "name",
        sortable: false,
    },
    {
        name: "type",
        label: "Type",
        field: (row) => row.types.join(", "),
        sortable: false,
        align: "left",
        required: true,
    },
    {
        name: "abilities",
        label: "Abilities",
        field: (row) => row.abilities.join(", "),
        sortable: false,
        align: "left",
        required: true,
    },
    {
        name: "Total Base Stat",
        label: "Abilities",
        field: "totalBaseStat",
        sortable: false,
        align: "left",
        required: true,
    },
    {
        name: "action",
        label: "",
        field: (row) => row,
        format: (val) =>
            h(QBtn, {
                label: "See Details",
                size: "sm",
                onclick: () => {
                    console.log(val);
                    viewDetails.value = val;
                    viewDetailsModal.value = true;
                },
            }),
        sortable: false,
        align: "left",
        required: true,
    },
];

const viewDetailsModal = ref(false);
const viewDetails = ref({});
const selected = ref([]);
</script>

<template>
    <div class="table-container">
        <div class="">
            <q-table
                title="Pokemons"
                v-model:pagination="pokemonStore.POKEMON_PAGINATION"
                :rows="pokemonStore.POKEMON_LIST"
                :columns="columns"
                row-key="name"
                selection="multiple"
                v-model:selected="selected"
                :loading="pokemonStore.LOADING"
                @request="pokemonStore.request"
            >
                <template v-slot:top>
                    <div class="text-h6 text-weight-bold">Pokemon</div>
                    <q-space />
                    <q-input dense filled debounce="300" color="primary" label="search">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>
                <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                </template>
            </q-table>
        </div>
    </div>
    <q-dialog v-model="viewDetailsModal">
        <q-card v-if="viewDetails">
            <q-card-section>
                <div class="text-h6">{{ viewDetails.name }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div class="row q-gutter-lg">
                    <div>
                        <img :src="viewDetails.frontImageFront" />
                    </div>
                    <div>
                        type: {{ viewDetails.types.join(", ") }} <br />
                        Abilities: {{ viewDetails.abilities.join(", ") }} <br />
                        Weight: {{ viewDetails.weight }} <br />
                        Total Base Stat: {{ viewDetails.totalBaseStat }}
                        <div>
                            <p class="text-h6 q-mb-xs">Base Stat:</p>
                            <div v-for="(stat, i) in viewDetails.baseStats">
                                <div>{{ stat.stat.name }}: {{ stat.base_stat }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<style scoped lang="scss">
.table-container {
    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    margin-bottom: 30px;
}
</style>
