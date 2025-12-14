import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './components/layouts/MainLayout'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { Homepage } from './pages/homepage/Homepage'
import Signup from './pages/signup/Signup'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import { api as axios } from './api'
import { useEffect, lazy, Suspense, useState, useCallback } from 'react'
import { LoadingPage } from './pages/loading/LoadingPage.jsx'
import PreLoader from './components/PreLoader.jsx'

// Lazy loaded components
const About = lazy(() => import('./pages/about/About'))
const Contact = lazy(() => import('./pages/contact/Contact'))
const Profiles = lazy(() => import('./pages/profiles/Profiles'))
const ProfileDetails = lazy(() => import('./pages/profiles/ProfileDetails.jsx'))
const NotFound = lazy(() => import('./pages/404/NotFound'))
const UnauthorizedPage = lazy(
  () => import('./pages/unauthorized/Unauthorized.jsx')
)
const ManageUsers = lazy(() => import('./pages/admin/ManageUser.jsx'))
const ManageBookings = lazy(() => import('./pages/admin/ManageBookings.jsx'))
const ManageServices = lazy(() => import('./pages/admin/ManageServices.jsx'))
const ManageReviews = lazy(() => import('./pages/admin/ManageReviews.jsx'))
const MyAccount = lazy(() => import('./pages/admin/MyAccount.jsx'))
const SignupRequest = lazy(() => import('./pages/signup/SignupRequest.jsx'))
const ManageRequests = lazy(() => import('./pages/admin/ManageRequests.jsx'))
const ManageBookingDetails = lazy(
  () => import('./pages/admin/ManageBookingDetails.jsx')
)

function App() {
  const [loading, setLoading] = useState(true)
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const user = useAuthStore((state) => state.user)

  const verifyToken = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authToken')
      if (token) {
        const response = await axios.post('/verify', { token: token })
        const verified = await response.data
        setAuth(verified)
      }
    } catch (error) {
      localStorage.removeItem('authToken')
      clearAuth()
    } finally {
      setLoading(false)
    }
  }, [setAuth, clearAuth])

  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  if (loading) return <LoadingPage />

  return (
    <Suspense fallback={<PreLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />

          <Route path="/profiles" element={<Profiles />} />
          <Route
            path="profiles/:user_id"
            element={user ? <ProfileDetails /> : <SignupRequest />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={user ? <AdminDashboard /> : <UnauthorizedPage />}
        >
          <Route path="my-account" element={<MyAccount />} />

          <Route path="users" element={<ManageUsers />} />
          <Route path="requests" element={<ManageRequests />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route
            path="bookings/:booking_id"
            element={<ManageBookingDetails />}
          />
          <Route path="services" element={<ManageServices />} />
          <Route path="reviews" element={<ManageReviews />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
