<template>
    <div class="cursor-pointer border border-gray-300 rounded-md bg-gray-50 mb-4 px-4 py-4">
        <div class="border border-gray-200 px-4 py-4 bg-gray-50 hover:bg-gray-100 text-end">
            <span v-if="result">{{ result }}</span>
            <span v-else v-for="value in formatedValues" :key="value">
                {{ value }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, type ComputedRef} from "vue";

const props = withDefaults(
    defineProps<{
        values: (string | number)[],
        result?: number
    }>(),
    {
        values: () => [],
        result: 0,
    }
)

const specialValues: (string | number)[] = ['CE', 'C', 'backspace', '=', 'x²', 'sqrt'];

const formatedValues: ComputedRef = computed(() => {
    return props.values.filter(item => !specialValues.includes(item))
})
</script>
