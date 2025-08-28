<template>
  <header
    class="w-full h-[280px] mx-auto bg-gradient-to-b to-[#FADF99] from-[#FFB034] rounded-b-[16px] overflow-hidden relative"
  >
    <key-icon class="absolute right-0 bottom-0" />
    <div class="flex items-center mt-4.5 ml-5 gap-5">
      <button>
        <back-icon class="w-10 h-10 text-[#15215C]" />
      </button>
      <h1 class="font-poppins font-bold text-[32px] leading-[40px] text-[#15215C] mt-11">
        Otwórz<br />bramę
      </h1>
    </div>
  </header>
</template>
<script setup lang="ts">
import backIcon from '../img/back.svg'
import keyIcon from '../img/key.svg'
</script>
