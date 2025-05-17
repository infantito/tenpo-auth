import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from 'context'
import { ProtectedRoute, PublicRoute } from 'components'
import { HomePage, LoginPage } from 'pages'

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
