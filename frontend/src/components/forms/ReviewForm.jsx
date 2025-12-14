import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useAuthStore } from '../../store/useAuthStore'
import { api as axios } from '../../api'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'

export const ReviewForm = ({ setShow, serviceId, refetch, setFeedback }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 1,
    },
  })

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pendingReviewData, setPendingReviewData] = useState(null)

  const onSubmit = (reviewData) => {
    setPendingReviewData(reviewData)
    setShowConfirmModal(true)
  }

  const user = useAuthStore((state) => state.user)

  const handleConfirmSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken')
      await axios.post(
        '/reviews',
        {
          ...pendingReviewData,
          client_id: user.user_id,
          service_id: serviceId,
        },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      setFeedback('Review submitted successfully!')
      setShow(false)
      setTimeout(() => {
        refetch()
      }, 3000)
    } catch (error) {
      if (isAxiosError(error)) {
        setFeedback(
          (await error.response.data?.message) || 'Failed to submit review'
        )
      } else {
        setFeedback(error.message || 'Failed to submit review')
      }
    } finally {
      setShowConfirmModal(false)
      setPendingReviewData(null)

      setTimeout(() => {
        setFeedback('')
      }, 3000)
    }
  }

  const handleCancelConfirm = () => {
    setShowConfirmModal(false)
    setPendingReviewData(null)
  }

  return (
    <Stack>
      <Form
        className="mx-5 booking-form mt-5"
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 500 }}
      >
        <h5>Add Review</h5>

        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Review Message</Form.Label>
          {errors.comment?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Review is required
            </small>
          )}
          <Form.Control
            placeholder="Enter your review"
            as="textarea"
            style={{ height: 200 }}
            {...register('comment', { required: true })}
          />
        </Form.Group>

        <Form.Group>
          {errors.rating?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Rating is required
            </small>
          )}
          <Form.Label> Rating </Form.Label>
          <div className="mb-4">
            {(() => {
              const selectedRating = Number(watch('rating') || 1)
              return [1, 2, 3, 4, 5].map((star) => (
                <label key={star} style={{ cursor: 'pointer', marginRight: 8 }}>
                  <input
                    type="radio"
                    value={star}
                    {...register('rating', { required: true })}
                    style={{ display: 'none' }}
                  />
                  <FaStar
                    color={selectedRating >= star ? '#553ab3' : '#e4e5e9'}
                    size={18}
                    data-testid={`star-${star}`}
                  />
                  <span className="visually-hidden">{star} Star</span>
                </label>
              ))
            })()}
          </div>
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
          <Modal.Title>Confirm Review Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit this review?</Modal.Body>
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
