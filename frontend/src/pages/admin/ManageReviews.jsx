import { useState, useEffect } from 'react'
import { api as axios } from '../../api'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CSpinner,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useAuthStore } from '../../store/useAuthStore'

export const ManageReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal state for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState(null)

  // Get current user
  const user = useAuthStore((state) => state.user)

  const getReviews = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authStore')
      const response = await axios.get('/reviews', {
        headers: { Authorization: 'Bearer ' + token },
      })
      const data = await response.data

      const userServiceIds = user.profile?.Services.map((review) => {
        return review.service_id
      })

      const reviewsForUser = []
      data.forEach((review) => {
        if (userServiceIds.includes(review.service_id)) {
          reviewsForUser.push(review)
        }
      })
      setReviews(reviewsForUser)
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getReviews()
  }, [])

  const handleDeleteClick = (reviewId) => {
    setReviewToDelete(reviewId)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('authStore')
      console.log(token, reviewToDelete)
      // await axios.get(`/reviews/${reviewToDelete}`, {
      //   headers: { Authorization: 'Bearer ' + token },
      // })
    } catch (err) {
      console.error('Error deleting review:', err)
    } finally {
      setShowDeleteModal(false)
      setReviewToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setReviewToDelete(null)
  }

  if (error) return <p>Error</p>
  if (loading) return <CSpinner color="primary" />
  if (reviews.length === 0) return <p>Currenty you don't have any reviews</p>

  return (
    <CCard>
      <CCardHeader>Manage Services</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Comment</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {reviews &&
              reviews.map((review) => (
                <CTableRow key={review.review_id}>
                  <CTableDataCell>{review.review_id}</CTableDataCell>
                  <CTableDataCell style={{ maxWidth: 300 }}>
                    {review.comment}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDeleteClick(review.review_id)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      </CCardBody>
      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </CCard>
  )
}
