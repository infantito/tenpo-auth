import * as React from 'react'
import type { AuthState, User } from 'types'

// Define action types
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { token: string; user: User } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  loading: false,
}

// Create context
interface AuthContextInterface extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextInterface>({
  ...initialState,
  login: async () => {},
  logout: () => {},
})

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...initialState,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

// Provider component
interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)

  // Fake login function - simulates API call and returns token
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })

      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Simple validation
      if (!email || !password) {
        throw new Error('Please enter email and password')
      }

      // Fake successful response with token
      const fakeToken = `auth-token-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
      const user: User = {
        id: '1',
        email,
      }

      // Save to session storage
      sessionStorage.setItem('authToken', fakeToken)
      sessionStorage.setItem('user', JSON.stringify(user))

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token: fakeToken, user },
      })
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Logout function
  const logout = () => {
    // Clear session storage
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
  }

  // Check for existing token on load
  React.useEffect(() => {
    const token = sessionStorage.getItem('authToken')
    const userJson = sessionStorage.getItem('user')

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User
        dispatch({
          type: 'LOGIN_SUCCESS',
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
