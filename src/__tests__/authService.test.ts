import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { authService, type LoginResult } from '../services/authService'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

const mockMutate = vi.fn()

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })
  describe('login', () => {
    it('should send request, return fake token and save to localStorage', async () => {
      const email = 'test@example.com'
      const password = 'password123'

      mockMutate.mockResolvedValue({
        data: {
          loginUser: {
            token: 'fake',
          },
        },
      })

      const result: LoginResult = await authService.login(email, password)

      expect(result).toEqual({ token: 'fake' })
      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', 'fake')
    })
  })

  describe('getToken', () => {
    it('should return token from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('stored-token')

      const result = authService.getToken()

      expect(localStorageMock.getItem).toHaveBeenCalledWith('auth_token')
      expect(result).toBe('stored-token')
    })
  })

  describe('isAuthenticated', () => {
    it('should return true when token exists', () => {
      localStorageMock.getItem.mockReturnValue('some-token')

      const result = authService.isAuthenticated()

      expect(result).toBe(true)
    })

    it('should return false when no token', () => {
      localStorageMock.getItem.mockReturnValue(null)

      const result = authService.isAuthenticated()

      expect(result).toBe(false)
    })
  })
})
