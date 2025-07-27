<template>
    <div class="cursor-pointer border border-gray-300 rounded-xl bg-gray-100 mb-4 px-4 py-4 shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
        <div class="rounded-md border border-gray-200 px-4 py-4 bg-gray-50 text-end">
            <span v-if="result">{{ result }}</span>
            <span v-else v-for="value in values" :key="value">
                {{ value }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">

withDefaults(
    defineProps<{
        values: (string | number)[],
        result?: number|string
    }>(),
    {
        values: () => [],
        result: 0,
    }
)
</script>
