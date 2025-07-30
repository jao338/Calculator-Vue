<template>
    <div
        data-cy="visor"
        class="cursor-pointer bg-gray-100 mb-4 px-4 py-4"
        :class="[Colors.shadow, Colors.border]"
    >
        <div class="px-4 py-4 bg-gray-50 text-end" :class="Colors.border">
            <div data-cy="result">
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
import {useService} from "../../pages/Calculator/Service"

const props = withDefaults(
    defineProps<{
        values: (string | number)[],
    }>(),
    {
        values: () => [],
    }
)

const { values } = useService();

const disallowedValues: (string | number)[] = ['sqrt', '^2'];

const formatedValues: ComputedRef<(string | number)[]> = computed(() => {
    const lastValue = values.value.at(-1);
    return props.values.filter(item =>
        !disallowedValues.includes(item) &&
        item !== lastValue
    );
});
</script>
