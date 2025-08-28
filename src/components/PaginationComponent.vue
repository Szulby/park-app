<template>
  <div class="flex items-center justify-center mt-18 mb-2">
    <div class="flex items-center space-x-10">
      <button
        v-for="(_, index) in steps"
        :key="index"
        @click="setActiveStep(index)"
        :class="[
          'w-5.5 h-5.5 rounded-full transition-all duration-200 hover:scale-110',
          modelValue === index
            ? 'bg-[#15215C] shadow-(--shadow-active)'
            : 'bg-white shadow-(--shadow-inactive)',
        ]"
        :aria-label="`Go to step ${index + 1}`"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  steps: number
  modelValue: number
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

defineProps<Props>()

const emit = defineEmits<Emits>()

const setActiveStep = (index: number) => {
  emit('update:modelValue', index)
}
</script>
