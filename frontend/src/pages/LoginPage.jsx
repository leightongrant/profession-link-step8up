import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import { LoginForm } from '../components/forms/LoginForm'

const LoginPage = () => {
  return (
    <Container as="main" style={{ minHeight: '100vh' }}>
      <LoginForm />
    </Container>
  )
}

export default LoginPage
