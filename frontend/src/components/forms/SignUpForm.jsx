import './Forms.css'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/esm/Stack'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { api as axios } from '../../api'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { decodeToken } from 'react-jwt'
import { useAuthStore } from '../../store/useAuthStore'
import Image from 'react-bootstrap/esm/Image'
import logo from '../../assets/images/logo.png'

export const SignUpForm = () => {
  const [errorFeedback, setErrorFeedback] = useState(null)
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (user) => {
    try {
      if (user.password !== user.confirmPassword)
        throw new Error('Passwords must match')
      const userData = {
        name: user.name,
        email: user.email,
        password: user.password,
      }
      await axios.post('/users', userData)

      const response = await axios.post('/login', {
        email: user.email,
        password: user.password,
      })
      const token = await response.data
      const payload = decodeToken(token)
      setAuth(payload)
      localStorage.setItem('authToken', token)
      navigate('/profiles')
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = await error.response.data
        setErrorFeedback(errorMessage)
      } else {
        setErrorFeedback(error.message || 'Passwords must match')
      }
    } finally {
      setTimeout(() => {
        setErrorFeedback(null)
      }, 5000)
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
          <h5>Create an account</h5>
        </Stack>

        {errorFeedback && <Alert variant="info">{errorFeedback}</Alert>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          {errors.name?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Name is required
            </small>
          )}
          <Form.Control
            placeholder="Enter name"
            {...register('name', { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          {errors.email?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Email is required
            </small>
          )}
          <Form.Control
            placeholder="Enter email"
            type="email"
            {...register('email', { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password1">
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

        <Form.Group className="mb-3" controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          {errors.confirmPassword?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Confirming your password is required
            </small>
          )}
          <Form.Control
            placeholder="Confirm password"
            type="password"
            {...register('confirmPassword', { required: true })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Signup
        </Button>
        <p>
          Already registered?{' '}
          <Link to="/login" className="text-info-emphasis">
            Login here
          </Link>
        </p>
      </Form>
    </Stack>
  )
}
