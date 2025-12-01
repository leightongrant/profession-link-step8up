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
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { MdDeleteOutline } from 'react-icons/md'

export const ManageUsers = () => {
  const { loading, data: initialData, error } = useFetchUsers()
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (initialData) {
      setUsers(initialData)
    }
  }, [initialData])

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await axios.delete(`/users/${userId}`)
      setUsers(data.filter((u) => u.user_id !== userId))
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  const handleApproveRole = async (userId, role) => {
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
      alert(`Approved ${role} role for user ${userId}`)
    } catch (err) {
      console.error('Error approving role:', err)
      setUsers(originalUsers)
    }
  }

  if (error) return <p>Error</p>
  if (loading) return <CSpinner color="primary" />

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
            {users.map((user) => (
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
                          color="success"
                          size="sm"
                          className="me-2"
                          onClick={() =>
                            handleApproveRole(user.user_id, 'lawyer')
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
                            handleApproveRole(user.user_id, 'accountant')
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
                    size="sm"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    <MdDeleteOutline />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
