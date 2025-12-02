import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useAuthStore } from '../../store/useAuthStore'
import Alert from 'react-bootstrap/Alert'
import { api as axios } from '../../api'
import { isAxiosError } from 'axios'
import { useState } from 'react'

export const BookingForm = ({ setShow, service_id, refetch }) => {
  const [feedback, setFeedback] = useState('')
  const formError = useAuthStore((state) => state.formError)
  const setError = useAuthStore((state) => state.setError)
  const user = useAuthStore((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (bookingData) => {
    try {
      const token = localStorage.getItem('authToken')
      await axios.post(
        '/bookings',
        { ...bookingData, client_id: user.user_id, service_id: service_id },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      setShow(false)
      refetch()
    } catch (error) {
      if (isAxiosError(error)) {
        setError(await error.response.data.message)
      } else {
        setError(error.message || 'Error creating user profile')
      }
    } finally {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <Stack>
      <Form
        className="mx-5 booking-form mt-5"
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 500 }}
      >
        <h5>Add booking message</h5>
        {formError && <Alert variant="info">{formError}</Alert>}
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Booking Message</Form.Label>
          {errors.message?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Message is required
            </small>
          )}
          <Form.Control
            placeholder="Enter your booking message"
            as="textarea"
            style={{ height: 200 }}
            {...register('message', { required: true })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Stack>
  )
}
