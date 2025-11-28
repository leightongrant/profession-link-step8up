import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Homepage } from './pages/homepage/Homepage'
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import { api as axios } from './api'

function App() {
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.post('/verify', { token: token })
      const verified = await response.data
      setAuth(verified)
    } catch (error) {
      localStorage.removeItem('authToken')
      clearAuth()
      //console.log(error)
    }
  }
  verifyToken()

  return (
    <Layout>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Layout>
  )
}

export default App
