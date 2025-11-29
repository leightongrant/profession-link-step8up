import { CContainer, CCard, CCardBody, CButton } from '@coreui/react'

export const AdminWelcome = () => {
  return (
    <CContainer className="mt-4">
      <CCard>
        <CCardBody>
          <h4>Welcome, Admin</h4>
          <p>
            Here you can manage users, approve requests, and oversee the system.
          </p>
          <CButton color="primary" href="/admin/users">
            Go to User Management
          </CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}
