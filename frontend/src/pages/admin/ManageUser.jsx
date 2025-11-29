import { useEffect, useState } from 'react'
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

export const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users')
        const data = await response.data
        setUsers(data)
      } catch (err) {
        console.error('Error fetching users:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await axios.delete(`/users/${userId}`)
      setUsers(users.filter((u) => u.user_id !== userId))
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  const handleApproveRole = async (userId, role) => {
    try {
      await axios.post(`/users/${userId}/approve-role`, { role })
      alert(`Approved ${role} role for user ${userId}`)
    } catch (err) {
      console.error('Error approving role:', err)
    }
  }

  if (loading) {
    return <CSpinner color="primary" />
  }

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
                  <CButton
                    color="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleApproveRole(user.user_id, 'lawyer')}
                  >
                    Approve Lawyer
                  </CButton>
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
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    Delete
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
