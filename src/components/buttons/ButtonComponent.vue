<template>
  <button class="bg-gray-50 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded flex justify-center items-center">
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: [String, Number],
    required: false
  },
  icon: {
    type: String,
    required: false
  }
})
</script>