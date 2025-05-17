import * as React from 'react'
import type { AuthContextValue, AuthLoginValues, AuthProviderProps, AuthState, User } from 'types'
import { AuthActionType, DEFAULT_CONTEXT_VALUES, INITIAL_STATE } from './auth-context.constants'

type AuthAction =
  | { type: AuthActionType.LOGIN; payload: { token: string; user: User } }
  | { type: AuthActionType.LOGOUT }
  | { type: AuthActionType.LOADING; payload: boolean }

const AuthContext = React.createContext<AuthContextValue>(DEFAULT_CONTEXT_VALUES)

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      }
    case AuthActionType.LOGOUT:
      return {
        ...INITIAL_STATE,
      }
    case AuthActionType.LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

const getInitialState = (initialState: AuthState) => {
  const newState: AuthState = { ...initialState }

  const authToken = sessionStorage.getItem('authToken')

  const userJson = sessionStorage.getItem('user')

  try {
    if (authToken && userJson) {
      const user = JSON.parse(userJson) as User

      newState.isAuthenticated = true

      newState.token = authToken

      newState.user = user
    }
  } catch {
    sessionStorage.removeItem('authToken')

    sessionStorage.removeItem('user')
  }

  return newState
}

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props

  const [state, dispatch] = React.useReducer(authReducer, INITIAL_STATE, getInitialState)

  /**
   * Fake login function - simulates API call and returns token
   */
  const login = async (params: AuthLoginValues) => {
    const { email, password } = params

    try {
      dispatch({ type: AuthActionType.LOADING, payload: true })

      /**
       * Simulate API call with timeout
       */
      await new Promise(resolve => setTimeout(resolve, 1000))

      /**
       * Simple validation
       */
      const hasError = !email || !password

      if (hasError) {
        throw new Error('Please enter email and password')
      }

      /**
       * Fake successful response with token
       */
      const fakeToken = `auth-token-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`

      const user: User = {
        id: '1',
        email,
      }

      /**
       * Save to session storage
       */
      sessionStorage.setItem('authToken', fakeToken)

      sessionStorage.setItem('user', JSON.stringify(user))

      dispatch({
        type: AuthActionType.LOGIN,
        payload: { token: fakeToken, user },
      })
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed')

      dispatch({ type: AuthActionType.LOADING, payload: false })
    }
  }

  const logout = () => {
    sessionStorage.removeItem('authToken')

    sessionStorage.removeItem('user')

    dispatch({ type: AuthActionType.LOGOUT })
  }

  React.useEffect(function verifySession() {
    const token = sessionStorage.getItem('authToken')

    const userJson = sessionStorage.getItem('user')

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User

        dispatch({
          type: AuthActionType.LOGIN,
          payload: { token, user },
        })
      } catch {
        sessionStorage.removeItem('authToken')

        sessionStorage.removeItem('user')
      }
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
