import { useState } from 'react'
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

const ManageUsers = () => {
  const { loading, data, error, refetch } = useFetchUsers()

  const [pageSize] = useState(15)
  const [currentOffset, setCurrentOffset] = useState(0)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId)
    setShowDeleteModal(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('authToken')
      await axios.delete(`/users/${userToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (err) {
      console.error('Error deleting user:', err)
    } finally {
      setShowDeleteModal(false)
      setUserToDelete(null)
      refetch()
    }
  }

  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setUserToDelete(null)
  }

  if (error) return <p>Error</p>
  if (loading) return <CSpinner color="primary" />

  const paginatedUsers = data
    .slice()
    .sort((a, b) => {
      if (a.pending_role && !b.pending_role) return -1
      if (!a.pending_role && b.pending_role) return 1
      return 0
    })
    .slice(currentOffset, currentOffset + pageSize)

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
            data={data.slice().sort((a, b) => {
              if (a.pending_role && !b.pending_role) return -1
              if (!a.pending_role && b.pending_role) return 1
              return 0
            })}
            offset={currentOffset}
            pageSize={pageSize}
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
    </CCard>
  )
}
export default ManageUsers
