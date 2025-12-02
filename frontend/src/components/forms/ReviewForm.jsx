import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useAuthStore } from '../../store/useAuthStore'
import Alert from 'react-bootstrap/Alert'
import { api as axios } from '../../api'
import { isAxiosError } from 'axios'
import { useState } from 'react'

export const ReviewForm = ({ setShow, service_id, refetch }) => {
  const [feedback, setFeedback] = useState('')
  const formError = useAuthStore((state) => state.formError)
  const setError = useAuthStore((state) => state.setError)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (reviewData) => {
    try {
        console.log(reviewData);
    //   const token = localStorage.getItem('authToken')
    //   await axios.post(
    //     '/reviews',
    //     { ...reviewData, client_id: user.user_id, service_id: service_id },
    //     { headers: { Authorization: 'Bearer ' + token } }
    //   )
      setShow(false)
      refetch()
    } catch (error) {
      if (isAxiosError(error)) {
        setError(await error.response.data.message)
      } else {
        setError(error.message || 'Error creating review')
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
        <h5>Add Review</h5>
        {formError && <Alert variant="info">{formError}</Alert>}
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Review Message</Form.Label>
          {errors.message?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Review is required
            </small>
          )}
          <Form.Control
            placeholder="Enter your review"
            as="textarea"
            style={{ height: 200 }}
            {...register('message', { required: true })}
          />
        </Form.Group>

        <Form.Group>
            {errors.rating?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Rating is required
            </small>
            )}
          <Form.Label> Rating </Form.Label>
            <Form.Select name="rating" id="rating" className="d-block mb-4" size="lg">
            <option value="1">Rating of 1 </option>
            <option value="2">Rating of 2 </option>
            <option value="3">Rating of 3</option>
            <option value="4">Rating of 4</option>
            <option value="5">Rating of 5</option>
            </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => setShow(false)}
          className="ms-2"
        >
          Close
        </Button>
      </Form>
    </Stack>
  )
}
