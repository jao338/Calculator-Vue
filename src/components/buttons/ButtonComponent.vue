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

const emits = defineEmits(['emitedValue'])

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
    if(validatedChar(val)){
        emits('emitedValue', val)
    }
}

const specialValues: (string | number)[] = ['CE', 'C', 'backspace', '='];

function validatedChar(val: string|number): boolean {
    return !specialValues.includes(val)
}
</script>
