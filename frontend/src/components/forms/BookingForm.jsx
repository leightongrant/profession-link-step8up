import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useAuthStore } from '../../store/useAuthStore'
import { api as axios } from '../../api'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import Modal from 'react-bootstrap/esm/Modal'

export const BookingForm = ({ setShow, service_id, refetch, setFeedback }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pendingBookingData, setPendingBookingData] = useState(null)
  const user = useAuthStore((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleConfirmSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken')
      await axios.post(
        '/bookings',
        {
          ...pendingBookingData,
          client_id: user.user_id,
          service_id: service_id,
        },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      setFeedback('Booking submitted successfully!')
      setShow(false)
      setTimeout(() => {
        refetch()
      }, 3000)
    } catch (error) {
      if (isAxiosError(error)) {
        setFeedback(
          (await error.response.data?.message) ||
            'Error submitting your booking'
        )
      } else {
        setFeedback(error.message || 'Error submitting your booking')
      }
    } finally {
      setShowConfirmModal(false)
      setPendingBookingData(null)

      setTimeout(() => {
        setFeedback(null)
      }, 3000)
    }
  }
  const onSubmit = async (bookingData) => {
    setPendingBookingData(bookingData)
    setShowConfirmModal(true)
  }

  const handleCancelConfirm = () => {
    setShowConfirmModal(false)
    setPendingBookingData(null)
  }

  return (
    <Stack>
      <Form
        className="mx-5 booking-form mt-5"
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 500 }}
      >
        <h5>Add booking message</h5>
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
        <Button
          variant="secondary"
          type="button"
          onClick={() => setShow(false)}
          className="ms-2"
        >
          Close
        </Button>
      </Form>
      {/* Confirm modal for form submission */}
      <Modal show={showConfirmModal} onHide={handleCancelConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit this booking?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelConfirm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirmSubmit()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Stack>
  )
}
