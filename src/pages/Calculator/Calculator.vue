<template>
    <div :class="[Colors.bgCalc, Colors.border]">
        <VisorComponent :values="values" :result="result"/>
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

const { getGridItems, values, result, specialChars } = useService();

const grid = ref<Grid[][]>(getGridItems());

function concatToValues(val: string | number): void {
  if(values.value.length != 0 && !specialChars.includes(val as string)){
    values.value.push(val)
  }
}

/*
*
* Criar um array com as estradas de teclado permitidas
* Não adicionar caracteres especiais quando "values.value" for vazio, quando o último item adicionado foi um caractere especial
*
* */

</script>
