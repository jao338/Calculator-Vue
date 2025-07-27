<template>
    <div class="bg-gray-100 border rounded-xl border border-gray-300 px-4 py-4 shadow-[3px_3px_4px_rgba(0,0,0,0.1)]">
        <VisorComponent :values="values" :result="result"/>
        <div class="grid grid-rows-5 grid-flow-col gap-4">
            <template v-for="(row, rowIndex) in grid" :key="rowIndex">
                <template v-for="item in row" :key="item.value">
                    <ButtonComponent
                        :data-cy="`button-${item.value}`"
                        :label="item.label"
                        :color="item.color"
                        :value="item.value"
                        @click="item.action"
                        @emited-value="concatToValues"
                        class="shadow-[2px_2px_4px_rgba(0,0,0,0.1)]"
                    />
                </template>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonComponent from "../../components/buttons/ButtonComponent.vue";
import VisorComponent from "../../components/util/VisorComponent.vue";
import {useCalculator} from "../../composables/useCalculator";

import {Colors} from '../../components/Enums'
import {ref} from "vue";
import {type Grid} from "./Interface";

const {evaluateExpression} = useCalculator()

const values = ref<(string | number)[]>([]);
const result = ref<number | string>(0);
const specialChars = ['+', '-', '*', '/'];

const resetNumber = (): number => 0;
const resetArray = (): Array<string> => [];

function concatToValues(val: string | number): void {
    values.value.push(val)
}

function clearAllData(): void {
    values.value = resetArray();
    result.value = resetNumber();
}

function clearLastValue(): void {
    values.value.pop();
    result.value = resetNumber();
}
function clearEntry(): void {
    values.value.findIndex(valor => specialChars.includes(valor as string)) == -1 ? values.value = resetArray() : null

    const lastInvalidIndex = [...values.value]
        .map((valor, idx) => ({ valor, idx }))
        .reverse()
        .find(({ valor }) =>
            typeof valor === 'string' &&
            specialChars.includes(valor) &&
            valor.length === 1
        )?.idx;

    if (lastInvalidIndex !== undefined) {
        values.value = values.value.slice(0, lastInvalidIndex);
    }

    result.value = resetNumber();
}

function execute(): void {
    if (evaluateExpression(values.value)) {
        result.value = evaluateExpression(values.value) as string
    }
    values.value = resetArray()
}

const grid = ref<Grid[][]>([
    [
        {value: 'CE', label: 'CE', color: Colors.bgBlue, action: clearEntry},
        {value: 7, label: '7'},
        {value: 4, label: '4'},
        {value: 1, label: '1'},
        {value: 0, label: '0'},
    ],
    [
        {value: 'C', label: 'C', color: Colors.bgBlue, action: clearAllData},
        {value: 8, label: '8'},
        {value: 5, label: '5'},
        {value: 2, label: '2'},
        {value: '.', label: ',', color: Colors.bgBlue},
    ],
    [
        {value: 'backspace', label: '⌫', color: Colors.bgRed, action: clearLastValue},
        {value: 9, label: '9'},
        {value: 6, label: '6'},
        {value: 3, label: '3'},
        {value: '%', label: '%', color: Colors.bgBlue},
    ],
    [
        {value: '/', label: '/', color: Colors.bgBlue},
        {value: '*', label: 'x', color: Colors.bgBlue},
        {value: '-', label: '-', color: Colors.bgBlue},
        {value: '+', label: '+', color: Colors.bgBlue},
    ],
    [
        {value: 'sqrt', label: '√', color: Colors.bgBlue},
        {value: '**2', label: 'x²', color: Colors.bgBlue},
        {value: '=', label: '=', color: Colors.bgGreen, action: execute},
    ],
]);

/*
*
* Criar ENUM com classes padrão? Ex. Estilos com background e borda arredondad em cinza
* Criar um composable que retorne a estrutura do grid.
* Criar um array com as estradas de teclado permitidas
* Não adicionar caracteres especiais quando "values.value" for vazio, quando o último item adicionado foi um caractere especial
*
* */

</script>
