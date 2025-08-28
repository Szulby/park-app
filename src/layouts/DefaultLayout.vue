<template>
  <div class="min-h-screen pb-16">
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
    <nav class="fixed bottom-0 left-0 right-0">
      <navigation-component />
    </nav>
  </div>
</template>
<script setup lang="ts">
import NavigationComponent from '../components/NavigationComponent.vue'
</script>
