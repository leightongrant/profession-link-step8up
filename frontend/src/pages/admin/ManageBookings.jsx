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
import { MdDeleteOutline } from 'react-icons/md'
import { useAuthStore } from '../../store/useAuthStore'

export const ManageBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = useAuthStore((state) => state.user)

  const getBookings = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/bookings`)
      const data = await response.data

      // Get service IDs owned by the current user (lawyer/accountant)
      const userServices = user?.profile?.Services || []
      const userServiceIds = userServices.map((service) => service.service_id)

      // Show bookings made by the user OR bookings for user's services
      const bookingsFound = data
        .filter(
          (booking) =>
            booking.user_id === user.user_id ||
            userServiceIds.includes(booking.service_id)
        )
        .map((booking) => {
          // If current user is the client, show provider info
          if (booking.user_id === user.user_id) {
            return {
              id: booking.booking_id,
              name: booking.Service?.User?.name || 'Provider',
              email: booking.Service?.User?.email || 'Provider Email',
              message: booking.message,
              status: booking.status,
              created_at: booking.created_at,
            }
          }
          // If current user is the provider, show client info
          // console.log(booking)
          return {
            id: booking.booking_id,
            name: booking.User?.name || 'Client',
            email: booking.User?.email || 'Client Email',
            message: booking.message,
            status: booking.status,
            created_at: booking.created_at,
          }
        })

      setBookings(bookingsFound)
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBookings()
  }, [])

  if (error) return <p>Error</p>
  if (loading) return <CSpinner color="primary" />
  if (bookings.length === 0) return <p>No Bookings</p>
  return (
    <CCard>
      <CCardHeader>Manage Bookings</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Message</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {bookings.map((bkings) => (
              <CTableRow key={bkings.id}>
                <CTableDataCell>{bkings.id}</CTableDataCell>
                <CTableDataCell>{bkings.name}</CTableDataCell>
                <CTableDataCell className="text-break">
                  {bkings.email}
                </CTableDataCell>
                <CTableDataCell style={{ maxWidth: 350 }}>
                  {bkings.message}
                </CTableDataCell>
                <CTableDataCell>{bkings.status}</CTableDataCell>
                <CTableDataCell>
                  {new Date(bkings.created_at).toDateString()}
                </CTableDataCell>
                <CTableDataCell>
                  {/* {user.pending_role ? (
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
                  </CButton> */}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
