<template>
    <div
        data-cy="visor"
        class="cursor-pointer bg-gray-100 mb-4 px-4 py-4"
        :class="[Colors.shadow, Colors.border]"
    >
        <div class="px-4 py-4 bg-gray-50 text-end" :class="Colors.border">
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
import {Colors} from "../Enums";

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
