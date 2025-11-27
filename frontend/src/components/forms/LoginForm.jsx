import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/esm/Stack'
import { Link } from 'react-router-dom'
import './LoginForm.css'

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <Stack className="login-form-container h-100 justify-content-center align-items-center">
      <Form className="mx-5 login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          {errors.email?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              First name is required
            </small>
          )}
          <Form.Control
            placeholder="Enter email"
            {...register('email', { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          {errors.password?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Password is required
            </small>
          )}
          <Form.Control
            placeholder="Password"
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
