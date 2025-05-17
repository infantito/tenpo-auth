import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'hooks'

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Outlet />
  }

  return <Navigate to="/login" replace={true} />
}

export default ProtectedRoute
