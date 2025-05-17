import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from 'hooks'

const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace={true} />
  }

  return <Outlet />
}

export default PublicRoute
