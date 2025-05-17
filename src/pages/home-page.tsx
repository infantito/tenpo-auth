import * as React from 'react'
import { LogOut, RefreshCw, List } from 'lucide-react'
import { fetchData } from '../services/api'
import { useAuth, useWindowSize } from 'hooks'
import { VirtualizedList } from 'components'
import type { ApiItem } from 'types'

const HomePage = () => {
  const [items, setItems] = React.useState<ApiItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const { logout, user } = useAuth()
  const { width } = useWindowSize()

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchData()
        setItems(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar los datos. Por favor, intenta de nuevo.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const data = await fetchData()
      setItems(data)
      setError(null)
    } catch {
      setError('Error al cargar los datos. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <List className="h-6 w-6 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">Data Explorer</h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 hidden md:inline-block">{user?.email}</span>
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Lista de Elementos ({items.length})
            </h2>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : items.length > 0 ? (
            <div className="mt-4">
              <VirtualizedList items={items} width={width - 48} />
              <p className="text-sm text-gray-500 mt-4">
                Mostrando {items.length} elementos. La lista utiliza renderizado virtual para
                optimizar el rendimiento.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay elementos para mostrar.</p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="text-md font-medium text-blue-800 mb-2">
            Mejora teórica para optimizar las llamadas al backend
          </h3>
          <p className="text-sm text-blue-700">
            Para mejorar la eficiencia en la carga de 2000 elementos, se podrían implementar las
            siguientes estrategias:
          </p>
          <ul className="list-disc pl-5 mt-2 text-sm text-blue-700 space-y-1">
            <li>Paginación en el servidor con carga incremental (infinita) del lado del cliente</li>
            <li>
              Implementación de caché con tiempo de expiración para reducir peticiones redundantes
            </li>
            <li>
              Solicitar solo los campos necesarios para reducir el tamaño de la respuesta (GraphQL o
              endpoints especializados)
            </li>
            <li>Compresión de respuestas HTTP para reducir el tiempo de transferencia</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default HomePage
