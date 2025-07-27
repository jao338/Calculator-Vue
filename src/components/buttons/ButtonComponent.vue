<template>
    <button
        class="cursor-pointer border border-gray-300 rounded-md font-bold py-2 px-4 w-full h-full"
        :class="[hasRowSpan2(value as string), hasColSpan3(value as string), color]"
        @click="onClick(value)"
    >
        <span>{{ label }}</span>
    </button>
</template>

<script setup lang="ts">
import {Colors} from '../Enums'
import {ref} from "vue";

const emits = defineEmits(['emitedValue'])
const rootEl = ref<HTMLElement | null>(null)

defineExpose({rootEl})

defineProps({
    label: {
        type: [String, Number],
        required: true
    },
    value: {
        type: [String, Number],
        required: true
    },
    color: {
        type: String,
        default: Colors.bgGray
    },
})

function hasRowSpan2(val: string): string {
    return val == '=' ? 'row-span-2' : 'row-span-1';
}

function hasColSpan3(val: string): string {
    return val === 'backspace' ? 'col-span-3' : 'col-span-1';
}

function onClick(val: string | number): void {
    emits('emitedValue', val)
}
</script>
