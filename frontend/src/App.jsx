import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Homepage } from './pages/Homepage'
import Signup from './pages/Signup'
import LoginPage from './pages/LoginPage'

function App() {
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
