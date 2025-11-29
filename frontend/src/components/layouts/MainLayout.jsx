import { Header } from '../Header'
import { Footer } from '../Footer'
import './MainLayout.css'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div as="div" className="page-wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
