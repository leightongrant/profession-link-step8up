import { Layout } from './components/Layout'
import { Homepage } from './pages/Homepage'
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Homepage />} />
      </Routes>
    </Layout>
  )
}

export default App
