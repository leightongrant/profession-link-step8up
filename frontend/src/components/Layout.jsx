import { Header } from './Header'
import { Footer } from './Footer'
import './Layout.css'
import { useLocation } from 'react-router-dom'
export const Layout = ({ children }) => {
  const { pathname } = useLocation()
  return (
    <div as="div" className="page-wrapper">
      {pathname === '/login' || pathname === '/signup' ? '' : <Header />}
      {children}
      {pathname === '/login' || pathname === '/signup' ? '' : <Footer />}
    </div>
  )
}
