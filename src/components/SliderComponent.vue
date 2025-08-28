<template>
  <div class="flex">
    <div class="w-full max-w-6xl mx-auto">
      <div class="relative overflow-hidden h-[450px]">
        <div
          v-for="(_, index) in totalSlides"
          :key="index"
          :class="[
            'slide absolute inset-0 transition-all duration-500 ease-in-out',
            getSlideClass(index),
          ]"
        >
          <gate-control />
        </div>
      </div>
      <pagination-component v-model="currentSlide" :steps="totalSlides" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import GateControl from './GateControl.vue'
import PaginationComponent from './PaginationComponent.vue'

const currentSlide = ref<number>(1)
const totalSlides = ref<number>(4)

const getSlideClass = (index: number): string => {
  if (index === currentSlide.value) {
    return 'opacity-100 translate-x-0'
  } else if (index < currentSlide.value) {
    return 'opacity-0 -translate-x-full'
  } else {
    return 'opacity-0 translate-x-full'
  }
}
</script>
