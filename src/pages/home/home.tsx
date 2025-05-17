import { RefreshCw } from 'lucide-react'
import { useWindowSize } from 'hooks'
import { Loader, VirtualizedList } from 'components'
import type { HomeListProps } from 'types'
import { Footer, Header } from 'containers'
import { getContainerPaddingX } from 'utils'
import useHome from './home.utils'

const HomeList = (props: HomeListProps) => {
  const { error, items, loading } = props

  const { width } = useWindowSize()

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{error}</p>
      </div>
    )
  }

  if (Array.isArray(items) && items.length > 0) {
    const containerPaddingX = getContainerPaddingX(width)

    const contentPaddingX = 48

    /**
     * Calculate the container width by subtracting padding and margins
     *
     * Max width of 1280px, 16px padding on each side
     */
    const containerWidth = (width <= 1280 ? width : 1280) - containerPaddingX

    return (
      <div className="mt-4 w-full">
        <VirtualizedList items={items} width={containerWidth - contentPaddingX} />
        <p className="text-sm text-gray-500 mt-4">
          Mostrando {items.length} elementos. La lista utiliza renderizado virtual para optimizar el
          rendimiento.
        </p>
      </div>
    )
  }

  return (
    <div className="text-center py-12">
      <p className="text-gray-500">No hay elementos para mostrar.</p>
    </div>
  )
}

const HomePage = () => {
  const { state, handleRefresh } = useHome()

  const { items, loading, error } = state

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 overflow-hidden">
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
          <HomeList loading={loading} error={error} items={items} />
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default HomePage
