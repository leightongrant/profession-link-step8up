import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layouts/MainLayout'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { Homepage } from './pages/homepage/Homepage'
import { About } from './pages/about/About.jsx'
import { Contact } from './pages/contact/Contact.jsx'
import { NotFound } from './pages/404/NotFound.jsx'
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import { api as axios } from './api'
import { ManageUsers } from './pages/admin/ManageUser'
import { MyAccount } from './pages/admin/MyAccount.jsx'
import { Profiles } from './pages/profiles/Profiles.jsx'
import { ProfileDetails } from './pages/profiles/ProfileDetails.jsx'
import { LoadingPage } from './pages/loading/LoadingPage.jsx'

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
    }
  }
  verifyToken()

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="profiles/:user_id" element={<ProfileDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="/admin/my-account" element={<MyAccount />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Route>
    </Routes>
  )
}

export default App
