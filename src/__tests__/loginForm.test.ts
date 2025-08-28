import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginForm from '../components/LoginForm.vue'

const push = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push }),
}))

vi.useFakeTimers()

const login = vi.fn()
vi.mock('../composables/useAuth', () => ({
  useAuth: () => ({ login }),
}))

describe('LoginForm.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('wyświetla błąd jeśli login nie zwróci tokena', async () => {
    login.mockResolvedValueOnce({})

    const wrapper = mount(LoginForm)

    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text()).toContain('Nie otrzymano tokena autoryzacyjnego')
    expect(push).not.toHaveBeenCalled()
  })

  it('przekierowuje jeśli login zwróci token', async () => {
    login.mockResolvedValueOnce({ token: 'fake' })

    const wrapper = mount(LoginForm)

    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    await flushPromises()

    expect(wrapper.text()).toContain('Zalogowano pomyślnie!')
    vi.runAllTimers()
    expect(push).toHaveBeenCalledWith('/')
  })

  it('pokazuje loader w trakcie logowania', async () => {
    let resolveLogin: (value: unknown) => void
    const pendingPromise = new Promise((r) => {
      resolveLogin = r
    })
    login.mockReturnValueOnce(pendingPromise)

    const wrapper = mount(LoginForm)

    await wrapper.find('input[type="email"]').setValue('test@example.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('button').text()).toBe('Logowanie...')

    resolveLogin!({})
    await flushPromises()
  })
})
