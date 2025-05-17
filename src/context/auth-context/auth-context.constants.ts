import type { AuthContextValue, AuthState } from 'types'

enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOADING = 'LOADING',
}

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
}

const DEFAULT_CONTEXT_VALUES: AuthContextValue = {
  ...INITIAL_STATE,
  login: async () => {},
  logout: () => {},
}

export { AuthActionType, INITIAL_STATE, DEFAULT_CONTEXT_VALUES }
