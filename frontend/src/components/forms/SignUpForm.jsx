import './LoginForm.css'
import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom'

import { useAuthStore } from '../../store/useAuthStore'
import Alert from 'react-bootstrap/Alert'
import { api as axios } from '../../api'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'

export const SignUpForm = () => {
  const navigate = useNavigate()
  const formError = useAuthStore((state) => state.formError)
  const setError = useAuthStore((state) => state.setError)
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
      navigate('/login')
    } catch (error) {
      if (isAxiosError(error)) {
        setError(await error.response.data.message)
      } else {
        setError(error.message || 'Passwords must match')
      }
    } finally {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <Stack className="login-form-container h-100 justify-content-center align-items-center">
      <Form className="mx-5 login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup</h2>
        {formError && <Alert variant="info">{formError}</Alert>}
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
