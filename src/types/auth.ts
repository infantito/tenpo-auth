type User = {
  id: string
  email: string
}

type AuthState = {
  isAuthenticated: boolean
  token: string
  user: User
  loading: boolean
}

type AuthLoginValues = {
  email: string
  password: string
}

type AuthContextValue = AuthState & {
  login: (params: AuthLoginValues) => Promise<void>
  logout: () => void
}

type AuthProviderProps = {
  children: React.ReactNode
}

export type { User, AuthState, AuthLoginValues, AuthContextValue, AuthProviderProps }
