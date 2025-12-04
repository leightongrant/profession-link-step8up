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

export const ManageServices = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Modal state for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState(null)

  // Get current user
  const user = useAuthStore((state) => state.user)
  const profileId = user.profile?.profile_id

  const getServices = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authStore')
      const response = await axios.get('/services', {
        headers: { Authorization: 'Bearer ' + token },
      })
      const data = await response.data
      const filteredData = data.filter(
        (service) => service.profile_id === profileId
      )
      setServices(filteredData)
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getServices()
  }, [])

  const handleDeleteClick = (serviceId) => {
    setServiceToDelete(serviceId)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('authStore')
      console.log(token, serviceToDelete)
      // await axios.get(`/services/${serviceToDelete}`, {
      //   headers: { Authorization: 'Bearer ' + token },
      // })
    } catch (err) {
      console.error('Error deleting user:', err)
    } finally {
      setShowDeleteModal(false)
      setServiceToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setServiceToDelete(null)
  }

  if (error) return <p>Error</p>
  if (loading) return <CSpinner color="primary" />
  if (services.length === 0) return <p>Currenty you don't have any services</p>

  return (
    <CCard>
      <CCardHeader>Manage Services</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {services &&
              services.map((service) => (
                <CTableRow key={service.service_id}>
                  <CTableDataCell>{service.service_id}</CTableDataCell>
                  <CTableDataCell>{service.title}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => console.log('add')}
                    >
                      Add Service
                    </CButton>
                    <CButton
                      color="secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => console.log('edit')}
                    >
                      Edit
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDeleteClick(service.service_id)}
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
