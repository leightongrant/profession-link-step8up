import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import { SignUpForm } from '../../components/forms/SignUpForm'

const Signup = () => {
  return (
    <Container as="main" style={{ minHeight: '100vh' }}>
      <SignUpForm />
    </Container>
  )
}

export default Signup
