<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Logowanie</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2"> Email </label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          :disabled="loading"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2"> Hasło </label>
        <input
          v-model="form.password"
          type="password"
          required
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          :disabled="loading"
        />
      </div>
      <span
        v-if="error"
        class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        v-text="error"
      ></span>
      <div
        v-if="success"
        class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded"
      >
        Zalogowano pomyślnie!
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {{ loading ? 'Logowanie...' : 'Zaloguj się' }}
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  success.value = false

  const result = await login(form.value.email, form.value.password)

  if (result.token) {
    success.value = true
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } else {
    error.value = 'Nie otrzymano tokena autoryzacyjnego'
  }

  loading.value = false
}
</script>
