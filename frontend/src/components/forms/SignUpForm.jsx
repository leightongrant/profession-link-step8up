import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom'
import './LoginForm.css'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <Stack className="login-form-container h-100 justify-content-center align-items-center">
      <Form className="mx-5 login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup</h2>
        <Form.Group className="mb-3" controlId="formBasicName">
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
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

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          {errors.confirmPassword?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Confirming your password is required
            </small>
          )}
          <Form.Control
            placeholder="Confirm password"
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
