<template>
    <div>
        <VisorComponent :values="values" :result="result" />
        <div class=" grid grid-rows-5 grid-flow-col gap-4">
            <template v-for="(gridItem, index) in grid" :key="index">
                <ButtonComponent
                    v-for="grid in gridItem"
                    :key="grid.value"
                    :label="grid.label"
                    :color="grid.color"
                    :value="grid.value"
                    @click="grid.action"
                    @emited-value="concatToValues"
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

const values = ref<(string | number)[]>([]);
const result = ref<number>(0);

function concatToValues(val: string | number): void {
    values.value.push(val)
}

function clearAllData(): void {
    values.value = resetArray();
    result.value = resetNumber();
}
function clearLastValue(): void {
    values.value.pop();
    values.value.pop();
    result.value = resetNumber();
}
function execute(): void {
    clearAllData();
    // Calcular o valor
    result.value = 12345
}

const resetNumber = (): number => 0;
const resetArray = (): Array<string> => [];

const grid = ref<Grid[][]>([
    [
        {value: 'CE', label: 'CE', color: Colors.bgBlue, action: clearAllData }, // Mudar depois, limpar apenas a entrada
        {value: 7, label: '7'},
        {value: 4, label: '4'},
        {value: 1, label: '1'},
        {value: 0, label: '0'},
    ],
    [
        {value: 'C', label: 'C', color: Colors.bgBlue, action: clearAllData },
        {value: 8, label: '8'},
        {value: 5, label: '5'},
        {value: 2, label: '2'},
        {value: ',', label: ',', color: Colors.bgBlue },
    ],
    [
        {value: 'backspace', label: '⌫', color: Colors.bgRed, action: clearLastValue },
        {value: 9, label: '9'},
        {value: 6, label: '6'},
        {value: 3, label: '3'},
        {value: '%', label: '%', color: Colors.bgBlue },
    ],
    [
        {value: '/', label: '/', color: Colors.bgBlue },
        {value: '*', label: '*', color: Colors.bgBlue },
        {value: '-', label: '-', color: Colors.bgBlue },
        {value: '+', label: '+', color: Colors.bgBlue },
    ],
    [
        {value: 'sqrt', label: '√', color: Colors.bgBlue },
        {value: 'x²', label: 'x²', color: Colors.bgBlue },
        {value: '=', label: '=', color: Colors.bgGreen, action: execute },
    ],
]);
</script>
