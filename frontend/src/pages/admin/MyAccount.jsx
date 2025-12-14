import {
  CCard,
  CCardHeader,
  CCardBody,
  CSpinner,
  CButton,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react'

import { useAuthStore } from '../../store/useAuthStore'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { api as axios } from '../../api'
import { ProfileForm } from '../../components/forms/ProfileForm'
import { useState } from 'react'

const MyAccount = () => {
  const [show, setShow] = useState(false)
  const user = useAuthStore((state) => state.user)
  const setAuth = useAuthStore((state) => state.setAuth)
  const {
    loading,
    data: currentUser,
    error,
    refetch,
  } = useFetchUsers(user.user_id)

  if (loading) return <CSpinner color="primary" />
  if (error) return <p>{error.message}</p>

  const handleRequests = async (e) => {
    const url = `/users/${user.user_id}/request-role`
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.put(
        url,
        {
          pending_role: e.target.name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const user = await response.data
      setAuth(user)
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) return <p>Getting user...</p>

  return (
    <CCard>
      <CCardHeader>My Account</CCardHeader>
      <CCardBody>
        {currentUser.role === 'accountant' &&
          !currentUser.Profile &&
          (show ? (
            ''
          ) : (
            <CButton onClick={() => setShow(true)}>Create Profile</CButton>
          ))}

        <CTabs defaultActiveItemKey="account">
          <CTabList variant="enclosed-pills">
            <CTab itemKey="account">Account</CTab>
            <CTab itemKey="profile">Profile</CTab>
            <CTab
              itemKey="requests"
              disabled={
                !!(
                  currentUser.role !== 'lawyer' ||
                  currentUser.role !== 'accountant'
                )
              }
            >
              Requests
            </CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel className="p-3" itemKey="account">
              <p>
                <strong>Name:</strong> {currentUser.name}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>Role:</strong> {currentUser.role}
              </p>
            </CTabPanel>
            <CTabPanel className="p-3" itemKey="profile">
              {currentUser.Profile ? (
                <>
                  <p>
                    <strong>Specialization:</strong>{' '}
                    {currentUser.Profile.specialization}
                  </p>
                  <p>
                    <strong>Location:</strong> {currentUser.Profile.location}
                  </p>

                  <p>
                    <strong>Experience:</strong>{' '}
                    {currentUser.Profile.experience_years}
                  </p>
                  <p>
                    <strong>Rating:</strong> {currentUser.Profile.rating_avg}
                  </p>

                  <p style={{ maxWidth: 800 }}>
                    <strong>Bio:</strong> {currentUser.Profile.bio}
                  </p>
                </>
              ) : (
                <p>You don't have a profile</p>
              )}

              {show && <ProfileForm setShow={setShow} refetch={refetch} />}
              {currentUser.role === 'lawyer' &&
                !currentUser.Profile &&
                (show ? (
                  ''
                ) : (
                  <CButton
                    className="btn btn-primary me-4"
                    name="create"
                    onClick={() => setShow(true)}
                  >
                    Create Profile
                  </CButton>
                ))}
            </CTabPanel>
            <CTabPanel className="p-3" itemKey="requests">
              {currentUser.pending_role && (
                <p className="text-info">
                  Your request has been submitted, awaiting approval...
                </p>
              )}
              {currentUser.role === 'client' && !currentUser.pending_role && (
                <div className="d-flex gap-4">
                  <CButton
                    className="btn btn-primary"
                    name="lawyer"
                    onClick={handleRequests}
                  >
                    Request a lawyer account
                  </CButton>
                  <CButton
                    className="btn btn-secondary"
                    name="accountant"
                    onClick={handleRequests}
                  >
                    Request an accountant account
                  </CButton>
                </div>
              )}
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </CCardBody>
    </CCard>
  )
}

export default MyAccount
