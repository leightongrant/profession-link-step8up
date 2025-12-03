import { CContainer, CCard, CCardBody, CButton } from '@coreui/react'
const style = {
  background: 'linear-gradient(90deg, #0d6efd 0%, #6610f2 100%)',
  color: '#fff',
  borderRadius: '0.5rem',
  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
}
export const AdminWelcome = () => {
  return (
    <CContainer fluid className="px-0 mb-4">
      <CCard className="border-0" style={style}>
        <CCardBody className="text-center py-3">
          <h1
            className="fw-bold mb-3 text-light"
            style={{ letterSpacing: '0.02em' }}
          >
            ProLINK Admin
          </h1>
          <p
            className="lead mb-4"
            style={{ maxWidth: 700, margin: '0 auto', fontSize: '1.25rem' }}
          >
            Welcome to the ProLINK Admin Dashboard. Here you can manage users,
            bookings, services, and reviews for lawyers and accountants. Use the
            sidebar to navigate between different admin features and keep the
            platform running smoothly.
          </p>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}
