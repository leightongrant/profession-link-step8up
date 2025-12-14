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

const ManageRequests = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [requestToApprove, setRequestToApprove] = useState(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [roleToApprove, setRoleToApprove] = useState('')

  const [showRejectModal, setShowRejectModal] = useState(false)
  const [requestToReject, setRequestToReject] = useState(null)

  const getRequests = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authStore')
      const response = await axios.get('/users', {
        headers: { Authorization: 'Bearer ' + token },
      })
      const data = await response.data
      const filteredData = data.filter((user) => user.pending_role !== null)
      setRequests(filteredData)
    } catch (error) {
      setError(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRequests()
  }, [])


  const handleRejectClick = (requestId) => {
    setRequestToReject(requestId)
    setShowRejectModal(true)
  }

  const handleRejectConfirm = async () => {
    try {
      const token = localStorage.getItem('authToken')
      await axios.put(
        `/users/${requestToReject}`,
        { pending_role: null },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      )
      getRequests()
    } catch (err) {
      console.error('Error deleting user:', err)
    } finally {
      setShowRejectModal(false)
      setRequestToReject(null)
    }
  }

  const handleRejectCancel = () => {
    setShowRejectModal(false)
    setRequestToReject(null)
  }


  const handleApproveClick = (userId, role) => {
    setRequestToApprove(userId)
    setRoleToApprove(role)
    setShowApproveModal(true)
  }

  const handleApproveCancel = () => {
    setShowApproveModal(false)
    setRequestToApprove(null)
    setRoleToApprove('')
  }

  const handleApproveRole = async () => {
    const requestId = requestToApprove
    const role = roleToApprove
    try {
      const token = localStorage.getItem('authToken')
      await axios.put(
        `/users/${requestId}`,
        { role: role, pending_role: null },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      getRequests()
     
    } catch (err) {
      console.error('Error approving role:', err)
    } finally {
      setRequestToApprove(null)
      setRoleToApprove(null)
      setShowApproveModal(!showApproveModal)
    }
  }

  if (error) return <p>Error</p>
  if (loading) return <CSpinner color="primary" />

  if (requests.length === 0) return <p>Currenty you don't have any requests</p>

  return (
    <CCard>
      <CCardHeader>Manage Requests</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Role</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {requests &&
              requests.map((request) => (
                <CTableRow key={request.user_id}>
                  <CTableDataCell>{request.user_id}</CTableDataCell>
                  <CTableDataCell>{request.name}</CTableDataCell>
                  <CTableDataCell>{request.role}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="primary text-capitalize"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        handleApproveClick(
                          request.user_id,
                          request.pending_role
                        )
                      }
                    >
                      {`Approve ${request.pending_role} Request`}
                    </CButton>
                    <CButton
                      color="secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleRejectClick(request.user_id)}
                    >
                      Reject Request
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    
      <Modal show={showRejectModal} onHide={handleRejectCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reject</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRejectCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRejectConfirm}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showApproveModal} onHide={handleApproveCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Role Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to approve this user as{' '}
          <strong>{roleToApprove}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleApproveCancel}>
            Cancel
          </Button>
          <Button
            variant={roleToApprove === 'lawyer' ? 'success' : 'info'}
            onClick={handleApproveRole}
          >
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </CCard>
  )
}

export default ManageRequests
