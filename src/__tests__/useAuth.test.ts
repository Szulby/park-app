import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../services/authService')

import { useAuth } from '../composables/useAuth'
import { authService } from '../services/authService'

const mockedAuthService = vi.mocked(authService)

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('initAuth', () => {
    it('should initialize auth token when token exists in authService', () => {
      const existingToken = 'fake'
      mockedAuthService.getToken.mockReturnValue(existingToken)

      const { initAuth, authToken } = useAuth()
      initAuth()

      expect(mockedAuthService.getToken).toHaveBeenCalledTimes(1)
      expect(authToken.value).toBe(existingToken)
    })
  })

  describe('login', () => {
    it('should call authService.login and set token when login successful', async () => {
      const email = 'test@example.com'
      const password = 'password123'
      const loginResult = { token: 'fake' }

      mockedAuthService.login.mockResolvedValue(loginResult)

      const { login, authToken } = useAuth()
      const result = await login(email, password)

      expect(mockedAuthService.login).toHaveBeenCalledWith(email, password)
      expect(authToken.value).toBe('fake')
      expect(result).toEqual(loginResult)
    })
  })
})
