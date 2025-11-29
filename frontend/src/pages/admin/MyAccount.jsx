import { CCard, CCardHeader, CCardBody, CSpinner } from '@coreui/react'
import { useAuthStore } from '../../store/useAuthStore'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import Button from 'react-bootstrap/esm/Button'

export const MyAccount = () => {
  const user = useAuthStore((state) => state.user)
  const { loading, data, error } = useFetchUsers(user.user_id)

  if (loading) return <CSpinner color="primary" />
  if (error) return <p>{error.message}</p>

  return (
    <CCard>
      <CCardHeader>My Account</CCardHeader>
      <CCardBody>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Role:</strong> {data.role}
        </p>
        {data.Profile ? (
          <>
            <p>
              <strong>Specialization:</strong> {data.Profile.specialization}
            </p>
            <p>
              <strong>Bio:</strong> {data.Profile.bio}
            </p>
          </>
        ) : (
          <div className="d-flex gap-4">
            <Button className="btn btn-primary">
              Request a lawyer account
            </Button>
            <Button className="btn btn-secondary">
              Request an accountant account
            </Button>
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}

export default MyAccount
