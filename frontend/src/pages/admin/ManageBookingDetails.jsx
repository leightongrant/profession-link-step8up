import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api as axios } from '../../api'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CListGroup,
  CListGroupItem,
  CButton,
} from '@coreui/react'
const ManageBookingDetails = () => {
  const [booking, setBooking] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const bookingId = params.booking_id.match(/\d+$/g)
  const getBooking = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`/bookings/${bookingId}`, {
        headers: { Authorization: 'Bearer ' + token },
      })
      setBooking(await response.data)
    } catch (error) {
      console.log(error)
      setError('Error getting booking')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getBooking()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  const {
    booking_id,
    service_id,
    client_id,
    status,
    message,
    created_at,
    Service,
    Client,
    User,
  } = booking

  return (
    <CCard>
      <CCardHeader>
        <h5>Booking Details</h5>
      </CCardHeader>
      <CCardBody>
        <CListGroup flush>
          <CListGroupItem>
            <strong>Booking ID:</strong> {booking_id}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Status:</strong> {status}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Created At:</strong> {new Date(created_at).toLocaleString()}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Service:</strong> {Service?.title || service_id}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Client:</strong> {User?.name}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Email:</strong> {User?.email}
          </CListGroupItem>
          <CListGroupItem>
            <strong>Message:</strong>
            <div className="mt-2">{message}</div>
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
      <CCardFooter className="text-end">
        <CButton color="primary" size="sm">
          Edit Booking
        </CButton>
        <CButton color="danger" size="sm" className="ms-2">
          Delete Booking
        </CButton>
      </CCardFooter>
    </CCard>
  )
}

export default ManageBookingDetails
