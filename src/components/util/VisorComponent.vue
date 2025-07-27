<template>
    <div data-cy="visor"
         class="cursor-pointer border border-gray-300 rounded-xl bg-gray-100 mb-4 px-4 py-4 shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
        <div class="rounded-md border border-gray-200 px-4 py-4 bg-gray-50 text-end">
            <span data-cy="result" v-if="result">{{ result }}</span>
            <div v-else data-cy="expression">
                <span  v-for="value in formatedValues" :key="value">
                    {{ value }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, type ComputedRef} from "vue";

const props = withDefaults(
    defineProps<{
        values: (string | number)[],
        result?: number | string
    }>(),
    {
        values: () => [],
        result: 0,
    }
)

const specialValues: (string | number)[] = ['sqrt', '**2'];

const formatedValues: ComputedRef<(string | number)[]> = computed(() => {
    return props.values.filter(item => !specialValues.includes(item))
})
</script>
