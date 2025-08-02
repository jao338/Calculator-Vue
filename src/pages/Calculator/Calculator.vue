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
                        class="min-w-[56px]"
                    />
                </template>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import hotkeys from 'hotkeys-js';
import ButtonComponent from "../../components/buttons/ButtonComponent.vue";
import VisorComponent from "../../components/util/VisorComponent.vue";
import {useService} from "./Service"

import {Colors} from '../../components/Enums'
import {onBeforeUnmount, onMounted, ref} from "vue";
import {type Grid} from "./Interface";

const {getGridItems, values, allowedKeys, concatToValues} = useService();

const grid = ref<Grid[][]>(getGridItems());


onMounted(() => {
  hotkeys('*', (event, handler) => {
    const key = event.key?.toLowerCase()
    if (key && allowedKeys.includes(key)) {
      concatToValues(key);
    }
  })
})

onBeforeUnmount(() => {
  hotkeys.unbind('*')
})

</script>
