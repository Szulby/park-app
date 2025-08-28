import { ref, computed } from 'vue'
import { authService, type LoginResult } from '../services/authService'

const authToken = ref<string | null>(null)

export function useAuth() {
  const initAuth = () => {
    const token = authService.getToken()
    if (token) {
      authToken.value = token
    }
  }

  const login = async (email: string, password: string): Promise<LoginResult> => {
    const result = await authService.login(email, password)

    if (result.token) {
      authToken.value = result.token
    }

    return result
  }

  return {
    isAuthenticated: computed(() => !!authToken.value),
    authToken: computed(() => authToken.value),
    login,
    initAuth,
  }
}
