import './LoginForm.css'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/esm/Stack'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { api as axios } from '../../api.js'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'

export const LoginForm = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const loginError = useAuthStore((state) => state.loginError)
  const setError = useAuthStore((state) => state.setError)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('/login', formData)
      const token = await response.data
      const payload = decodeToken(token)
      setAuth(payload)
      localStorage.setItem('authToken', token)
      navigate('/')
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message || 'Invalid email or password!')
    } finally {
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  return (
    <Stack className="login-form-container h-100 justify-content-center align-items-center">
      <Form className="mx-5 login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        {loginError && <Alert variant="info">{loginError}</Alert>}

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          {errors.email?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Email address is required
            </small>
          )}
          <Form.Control
            placeholder="Enter email"
            type="email"
            {...register('email', { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          {errors.password?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Password is required
            </small>
          )}
          <Form.Control
            placeholder="Password"
            type="password"
            {...register('password', { required: true })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="text-info-emphasis">
            Register here
          </Link>
        </p>
      </Form>
    </Stack>
  )
}
