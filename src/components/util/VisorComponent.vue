<template>
    <div
        data-cy="visor"
        class="cursor-pointer bg-gray-100 mb-4 px-4 py-4"
        :class="[Colors.shadow, Colors.border]"
    >
        <div class="px-4 py-4 bg-gray-50 text-end" :class="Colors.border">
            <div data-cy="result" class="min-h-[24px]">
                <span  v-for="(value, index) in formattedValues" :key="`${value}-${index}`">
                    {{ value }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {Colors} from "../Enums";

const props = withDefaults(
    defineProps<{
        values: (string | number)[],
    }>(),
    {
        values: () => [],
    }
)

const formatToken = (tok: string | number) => {
  if (tok === 'sqrt') return '√('
  if (tok === '^2')   return '²'
  return tok
}

const disallowedValues: (string | number)[] = ['sqrt', '^2'];

const formattedValues = computed(() =>
    props.values
        .filter((v) => !disallowedValues.includes(v as string))
        .map(formatToken)
)
</script>
