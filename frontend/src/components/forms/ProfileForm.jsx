import { useForm } from 'react-hook-form'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useAuthStore } from '../../store/useAuthStore'
import Alert from 'react-bootstrap/Alert'
import { api as axios } from '../../api'
import { isAxiosError } from 'axios'
import { LuBrain } from 'react-icons/lu'

export const ProfileForm = ({ setShow, refetch }) => {
  const formError = useAuthStore((state) => state.formError)
  const setError = useAuthStore((state) => state.setError)
  const user = useAuthStore((state) => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (profileData) => {
    try {
      const token = localStorage.getItem('authToken')
      await axios.post(
        '/profiles',
        { ...profileData, user_id: user.user_id },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      setShow(false)
      refetch()
    } catch (error) {
      if (isAxiosError(error)) {
        setError(await error.response.data.message)
      } else {
        setError(error.message || 'Error creating user profile')
      }
    } finally {
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <Stack>
      <Form
        className="mx-5 profile-form mt-5"
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: 500 }}
      >
        <h5>Add profile details</h5>
        {formError && <Alert variant="info">{formError}</Alert>}
        <Form.Group className="mb-3" controlId="specialization">
          <Form.Label>Specialization</Form.Label>
          {errors.specialization?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Specialization is required
            </small>
          )}
          <Form.Control
            placeholder="My Specialization"
            type="text"
            {...register('specialization', { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="experience_years">
          <Form.Label>Years Experience</Form.Label>
          {errors.specialization?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Experience is required
            </small>
          )}
          <Form.Control
            placeholder="8"
            type="text"
            {...register('experience_years', { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="profile_photo_url">
          <Form.Label>Photo URL</Form.Label>
          {errors.profile_photo_url?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Photo url is required
            </small>
          )}
          <Form.Control
            placeholder="https://example.com/images/profile42.jpg"
            type="url"
            {...register('profile_photo_url', { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          {errors.location?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Location is required
            </small>
          )}
          <Form.Control
            placeholder="London, UK"
            type="text"
            {...register('location', { required: true })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Bio</Form.Label>
          {errors.bio?.type === 'required' && (
            <small role="alert" className="text-danger d-block mt-2">
              Bio is required
            </small>
          )}
          <div
            style={{
              position: 'relative',
            }}
          >
            <Form.Control
              placeholder="My Bio"
              as="textarea"
              style={{ height: 150 }}
              {...register('bio', { required: true })}
            />
            <Button
              style={{ position: 'absolute', right: 10, bottom: 10 }}
              className="btn btn-dark"
            >
              Use AI <LuBrain />
            </Button>
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Stack>
  )
}
