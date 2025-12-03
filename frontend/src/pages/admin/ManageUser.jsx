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
  CCardFooter,
} from '@coreui/react'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { MdDeleteOutline } from 'react-icons/md'
import { AdminPagination } from './AdminPagination'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const ManageUsers = () => {
  const { loading, data: initialData, error } = useFetchUsers()
  const [users, setUsers] = useState([])

  const [pageSize] = useState(15)
  const [currentOffset, setCurrentOffset] = useState(0)

  // Modal state for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  // Modal state for role approval
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [userToApprove, setUserToApprove] = useState(null)
  const [roleToApprove, setRoleToApprove] = useState('')

  useEffect(() => {
    if (initialData) {
      setUsers(initialData)
    }
  }, [initialData])

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/users/${userToDelete}`)
      setUsers(users.filter((u) => u.user_id !== userToDelete))
    } catch (err) {
      console.error('Error deleting user:', err)
    } finally {
      setShowDeleteModal(false)
      setUserToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  const handleApproveClick = (userId, role) => {
    setUserToApprove(userId)
    setRoleToApprove(role)
    setShowApproveModal(true)
  }

  const handleApproveRole = async () => {
    const userId = userToApprove
    const role = roleToApprove
    const originalUsers = users
    const updatedUsers = users.map((user) =>
      user.user_id === userId
        ? { ...user, role: role, pending_role: null }
        : user
    )
    setUsers(updatedUsers)

    try {
      const token = localStorage.getItem('authToken')
      await axios.put(
        `/users/${userId}`,
        { role: role, pending_role: null },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      // Optionally show a toast or notification here
    } catch (err) {
      console.error('Error approving role:', err)
      setUsers(originalUsers)
    } finally {
      setShowApproveModal(false)
      setUserToApprove(null)
      setRoleToApprove('')
    }
  }

  const handleApproveCancel = () => {
    setShowApproveModal(false)
    setUserToApprove(null)
    setRoleToApprove('')
  }

  if (error) return <p>Error</p>
  if (loading) return <CSpinner color="primary" />

  // Slice users for current page
  const paginatedUsers = users.slice(currentOffset, currentOffset + pageSize)

  return (
    <CCard>
      <CCardHeader>Manage Users</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Role</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {paginatedUsers.map((user) => (
              <CTableRow key={user.user_id}>
                <CTableDataCell>{user.user_id}</CTableDataCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.role}</CTableDataCell>
                <CTableDataCell>
                  {user.pending_role ? (
                    <>
                      {user.pending_role === 'lawyer' ? (
                        <CButton
                          color="info"
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            handleApproveClick(user.user_id, 'lawyer')
                          }
                        >
                          Approve Lawyer
                        </CButton>
                      ) : (
                        <CButton
                          color="info"
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            handleApproveClick(user.user_id, 'accountant')
                          }
                        >
                          Approve Accountant
                        </CButton>
                      )}
                    </>
                  ) : (
                    ''
                  )}
                  <CButton
                    color="danger"
                    className="bg-transparent border-0"
                    size="sm"
                    onClick={() => handleDeleteClick(user.user_id)}
                  >
                    <MdDeleteOutline className="text-danger fs-3" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CCardFooter className="d-flex justify-content-center">
          <AdminPagination
            data={users}
            offset={pageSize}
            setOffset={setCurrentOffset}
          />
        </CCardFooter>
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
      {/* Role approval modal */}
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
