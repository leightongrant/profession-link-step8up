import { CCard, CCardHeader, CCardBody, CSpinner } from '@coreui/react'
import { useAuthStore } from '../../store/useAuthStore'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import Button from 'react-bootstrap/esm/Button'
import { api as axios } from '../../api'
import { ProfileForm } from '../../components/forms/ProfileForm'
import { useState } from 'react'

export const MyAccount = () => {
  const [show, setShow] = useState(false)
  const user = useAuthStore((state) => state.user)
  const setAuth = useAuthStore((state) => state.setAuth)
  const { loading, data, error, refetch } = useFetchUsers(user.user_id)

  if (loading) return <CSpinner color="primary" />
  if (error) return <p>{error.message}</p>

  const handleRequests = async (e) => {
    const url = `/users/${user.user_id}/request-role`
    try {
      const response = await axios.put(url, {
        pending_role: e.target.name,
      })
      const user = await response.data
      setAuth(user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CCard>
      <CCardHeader>My Account</CCardHeader>
      <CCardBody>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        {data.Profile && (
          <p>
            <strong>Specialization:</strong> {data.Profile.specialization}
          </p>
        )}
        {data.Profile && (
          <p>
            <strong>Location:</strong> {data.Profile.location}
          </p>
        )}
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Role:</strong> {data.role}
        </p>
        {data.Profile && (
          <>
            <p>
              <strong>Specialization:</strong> {data.Profile.specialization}
            </p>
            <p>
              <strong>Bio:</strong> {data.Profile.bio}
            </p>
          </>
        )}
        {show && <ProfileForm setShow={setShow} refetch={refetch} />}
        {data.role === 'lawyer' &&
          !data.Profile &&
          (show ? (
            ''
          ) : (
            <Button onClick={() => setShow(true)}>Create Profile</Button>
          ))}

        {data.role === 'accountant' &&
          !data.Profile &&
          (show ? (
            ''
          ) : (
            <Button onClick={() => setShow(true)}>Create Profile</Button>
          ))}

        {user.pending_role && (
          <p className="text-info">Request is pending...</p>
        )}

        {data.role === 'client' && !user.pending_role && (
          <div className="d-flex gap-4">
            <Button
              className="btn btn-primary"
              name="lawyer"
              onClick={handleRequests}
            >
              Request a lawyer account
            </Button>
            <Button
              className="btn btn-secondary"
              name="accountant"
              onClick={handleRequests}
            >
              Request an accountant account
            </Button>
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}

export default MyAccount
