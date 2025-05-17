import { useAuth } from 'hooks'
import { List, LogOut } from 'lucide-react'

const Header = () => {
  const { logout, user } = useAuth()

  return (
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
  )
}

export default Header
