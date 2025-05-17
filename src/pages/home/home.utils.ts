import * as React from 'react'
import { fetchData } from 'services'
import type { ApiItem } from 'types'

const useHome = () => {
  const [state, setState] = React.useState({
    items: [] as ApiItem[],
    loading: true,
    error: null as string,
  })

  const dispatch = (newValues: Partial<typeof state>) => {
    setState(prevState => ({
      ...prevState,
      ...newValues,
    }))
  }

  React.useEffect(function getList() {
    const loadData = async () => {
      try {
        const data = await fetchData()

        dispatch({
          items: data,
          loading: false,
        })
      } catch {
        dispatch({
          error: 'Error al cargar los datos. Por favor, intenta de nuevo.',
          loading: false,
        })
      }
    }

    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRefresh = async () => {
    dispatch({ loading: true, error: null })

    try {
      const data = await fetchData()

      dispatch({
        items: data,
        loading: false,
        error: null,
      })
    } catch {
      dispatch({
        error: 'Error al cargar los datos. Por favor, intenta de nuevo.',
        loading: false,
      })
    }
  }

  return {
    state,
    handleRefresh,
  }
}

export default useHome
