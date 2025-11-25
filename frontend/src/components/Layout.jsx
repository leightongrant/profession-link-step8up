import { Header } from './Header'
import { Footer } from './Footer'
import './Layout.css'
export const Layout = ({ children }) => {
  return (
    <div as="div" className="page-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
