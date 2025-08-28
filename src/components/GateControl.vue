<template>
  <div class="max-w-2xl mx-auto mt-10">
    <div class="flex items-start">
      <PilotIcon class="h-[400px] w-auto flex-shrink-0 flex-[0_0_40%]" />
      <div class="flex-1 ml-1 mr-8">
        <h1 class="font-dm-sans font-bold text-[24px] leading-[40px] text-center text-[#15215C]">
          Długa nazwa pilota
        </h1>
        <div class="space-y-5 mt-8">
          <button
            v-for="gate in gates"
            :key="gate.id"
            @click="selectedGate = gate.id"
            :class="[
              'w-full py-1.5 border-1 rounded-[11.5px] border-[#15215C]',
              selectedGate === gate.id && 'bg-[#15215C]',
            ]"
          >
            <span
              :class="[
                'font-lato font-medium text-[17.25px] text-[#15215C]',
                selectedGate === gate.id && 'text-white',
              ]"
              v-text="gate.name"
            ></span>
          </button>
        </div>

        <p class="text-[#15215C] font-dm-sans text-md text-center font-normal leading-6 mt-9">
          Wybierz bramę, by otworzyć
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PilotIcon from '../img/pilot.svg'

const selectedGate = ref(1)

const gates = [
  { id: 1, name: 'Szlaban Grzybowska 1' },
  { id: 2, name: 'Brama Garażowa 1' },
  { id: 3, name: 'Brama Wyjazdowa Śląska' },
  { id: 4, name: 'Szlaban Pomorska 32' },
]
</script>
