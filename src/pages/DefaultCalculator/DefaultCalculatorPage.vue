<template>
  <div class="text-grey">
    <div class=" grid grid-rows-4 grid-flow-col gap-4">
      <template v-for="(columnGroup, index) in columns" :key="index">
        <div
            v-for="column in columnGroup"
            :key="column.value"
            class="border border-gray-300"
            :class="[hasSpan2(column.value as string)]"
        >
          <ButtonComponent :label="column.label" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "../../components/buttons/ButtonComponent.vue";
import {Colors} from '../../components/Enums'
import {ref} from "vue";
import {type Grid} from "./DefaultCalculatorInterface";

function hasSpan2(val: string): string
{
  return val == '=' ? 'row-span-2' : 'row-span-1'
}

const columns = ref<Grid[][]>([
  [
    { value: 7, label: '7', color: Colors.bgGray, icon: '' },
    { value: 4, label: '4', color: Colors.bgGray, icon: '' },
    { value: 1, label: '1', color: Colors.bgGray, icon: '' },
    { value: 0, label: '0', color: Colors.bgGray, icon: '' },
  ],
  [
    { value: 8, label: '8', color: Colors.bgGray, icon: '' },
    { value: 5, label: '5', color: Colors.bgGray, icon: '' },
    { value: 2, label: '2', color: Colors.bgGray, icon: '' },
    { value: ',', label: ',', color: Colors.bgGray, icon: '' },
  ],
  [
    { value: 9, label: '9', color: Colors.bgGray, icon: '' },
    { value: 6, label: '6', color: Colors.bgGray, icon: '' },
    { value: 3, label: '3', color: Colors.bgGray, icon: '' },
    { value: '%', label: '%', color: Colors.bgGray, icon: '' },
  ],
  [
    { value: '/', label: '/', color: Colors.bgGray, icon: '' },
    { value: 'x', label: 'x', color: Colors.bgGray, icon: '' },
    { value: '-', label: '-', color: Colors.bgGray, icon: '' },
    { value: '+', label: '+', color: Colors.bgGray, icon: '' },
  ],
  [
    { value: 'a', label: 'a', color: Colors.bgGray, icon: '' },
    { value: 'x²', label: 'x²', color: Colors.bgGray, icon: '' },
    { value: '=', label: '=', color: Colors.bgGray, icon: '' },
  ],
]);
</script>
