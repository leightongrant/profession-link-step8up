import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import slugify from 'slugify'
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
  CBadge,
} from '@coreui/react'
import { useAuthStore } from '../../store/useAuthStore'

const ManageBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)

  const getBookings = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/bookings`)
      const data = await response.data

      const userServices = user?.profile?.Services || []
      const userServiceIds = userServices.map((service) => service.service_id)

      const bookingsForUser = data.filter((booking) =>
        userServiceIds.includes(booking.service_id)
      )
      setBookings(bookingsForUser)
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

  const handleViewBookingRequest = (bookingUser, bookingId) => {
    navigate(`${slugify(bookingUser + bookingId).toLocaleLowerCase()}`)
  }

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
              <CTableHeaderCell scope="col">Client</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {bookings.map((booking) => (
              <CTableRow key={booking.booking_id}>
                <CTableDataCell>{booking.booking_id}</CTableDataCell>
                <CTableDataCell>{booking.User.name}</CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    color={
                      booking.status === 'confirmed'
                        ? 'success'
                        : booking.status === 'completed'
                          ? 'secondary'
                          : 'info'
                    }
                    className="text-capitalize"
                  >
                    {booking.status}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="success"
                    size="sm"
                    className="me-2"
                    onClick={() =>
                      handleViewBookingRequest(
                        booking.User.name,
                        booking.booking_id
                      )
                    }
                  >
                    View Booking Request
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

export default ManageBookings
