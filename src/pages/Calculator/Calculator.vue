<template>
    <div :class="[Colors.bgCalc, Colors.border]">
        <VisorComponent :values="values"/>
        <div :class="Colors.grid">
            <template v-for="(row, rowIndex) in grid" :key="rowIndex">
                <template v-for="item in row" :key="item.value">
                    <ButtonComponent
                        :data-cy="`button-${item.value}`"
                        :label="item.label"
                        :color="item.color"
                        :value="item.value"
                        @click="item.action"
                        @emited-value="concatToValues"
                        :class="Colors.shadow"
                    />
                </template>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtonComponent from "../../components/buttons/ButtonComponent.vue";
import VisorComponent from "../../components/util/VisorComponent.vue";
import {useService} from "./Service"

import {Colors} from '../../components/Enums'
import {ref} from "vue";
import {type Grid} from "./Interface";

const {getGridItems, values, specialChars} = useService();

const grid = ref<Grid[][]>(getGridItems());

function concatToValues(val: string | number): void {
    const isFirstValue = values.value.length === 0;
    const isSpecialChar = specialChars.includes(val as string);

    if (isFirstValue && isSpecialChar) {
        return;
    }

    if (val === 'sqrt') {
        applySquareRoot();
        return;
    }
    else{
        values.value.push(val);
    }
}

function applySquareRoot(): void {
    const newValues: (string | number)[] = ['sqrt', '('];

    for (const item of values.value) {
        if (item !== 'sqrt') {
            newValues.push(item);
        }
    }

    newValues.push(')');
    values.value = newValues;
}

/*
*
* Criar um array com as estradas de teclado permitidas
* Exibir um array com valores diferentes para o visor ao invés da expressão toda
*
* */

</script>
