import * as React from 'react'

import { useAuth } from 'hooks'

const useLogin = () => {
  const { login } = useAuth()

  const [state, setState] = React.useState({
    email: '',
    password: '',
    errors: { email: '', password: '' },
    loading: false,
  })

  const { email, password } = state

  const dispatch = (newValues: Partial<typeof state>) => {
    setState(prevState => ({
      ...prevState,
      ...newValues,
    }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    dispatch({ [name]: value })
  }

  const validate = () => {
    let isValid = true

    const newErrors: typeof state.errors = { email: '', password: '' }

    if (!email) {
      newErrors.email = 'Email es requerido'

      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email no es válido'

      isValid = false
    }

    if (!password) {
      newErrors.password = 'Contraseña es requerida'

      isValid = false
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'

      isValid = false
    }

    dispatch({ errors: newErrors })

    return isValid
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValid = validate()

    if (isValid) {
      await login({ email, password })
    }
  }

  return {
    state,
    handleChange,
    handleSubmit,
  }
}

export { useLogin }
