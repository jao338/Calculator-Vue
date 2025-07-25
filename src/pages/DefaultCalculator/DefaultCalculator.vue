<template>
    <!--        Adicionar classes-->
    <div>
        <VisorComponent/>
        <div class=" grid grid-rows-5 grid-flow-col gap-4">
            <template v-for="(gridItem, index) in grid" :key="index">
                <ButtonComponent
                    v-for="grid in gridItem"
                    :key="grid.value"
                    :label="grid.label"
                    :color="grid.color"
                    :value="grid.value"
                    @emited-value="teste"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonComponent from "../../components/buttons/ButtonComponent.vue";
import VisorComponent from "../../components/util/VisorComponent.vue";

import {Colors} from '../../components/Enums'
import {ref} from "vue";
import {type Grid} from "./DefaultCalculatorInterface";

function teste(val: string | number): void {
    console.log(val)
}

const grid = ref<Grid[][]>([
    [
        {value: 'CE', label: 'CE', color: Colors.bgBlue},
        {value: 7, label: '7'},
        {value: 4, label: '4'},
        {value: 1, label: '1'},
        {value: 0, label: '0'},
    ],
    [
        {value: 'C', label: 'C', color: Colors.bgBlue},
        {value: 8, label: '8'},
        {value: 5, label: '5'},
        {value: 2, label: '2'},
        {value: ',', label: ',', color: Colors.bgBlue},
    ],
    [
        {value: 'backspace', label: '⌫', color: Colors.bgRed},
        {value: 9, label: '9'},
        {value: 6, label: '6'},
        {value: 3, label: '3'},
        {value: '%', label: '%', color: Colors.bgBlue},
    ],
    [
        {value: '/', label: '/', color: Colors.bgBlue},
        {value: '*', label: '*', color: Colors.bgBlue},
        {value: '-', label: '-', color: Colors.bgBlue},
        {value: '+', label: '+', color: Colors.bgBlue},
    ],
    [
        {value: 'sqrt', label: '√', color: Colors.bgBlue},
        {value: 'x²', label: 'x²', color: Colors.bgBlue},
        {value: '=', label: '=', color: Colors.bgGreen},
    ],
]);
</script>
