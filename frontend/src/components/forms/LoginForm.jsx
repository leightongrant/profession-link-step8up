import './Forms.css'
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
import { useState } from 'react'
import Image from 'react-bootstrap/esm/Image.js'
import logo from '../../assets/images/logo.png'

export const LoginForm = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const [errorFeedback, setErrorFeedback] = useState(null)
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
      navigate('/profiles')
    } catch (error) {
      console.log(error.response.data.message)
      setErrorFeedback(
        error.response.data.message || 'Invalid email or password!'
      )
    } finally {
      setTimeout(() => {
        setErrorFeedback(null)
      }, 3000)
    }
  }

  return (
    <Stack
      className="login-form-container justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <Form className="mx-5 login-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack className="justify-content-center align-items-center" gap={3}>
          <Link to="/">
            <Image src={logo} width={100} />
          </Link>
          <h5>Log to your account</h5>
        </Stack>

        {errorFeedback && <Alert variant="info">{errorFeedback}</Alert>}

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
