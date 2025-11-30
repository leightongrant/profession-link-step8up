import Stack from 'react-bootstrap/esm/Stack'
import Spinner from 'react-bootstrap/esm/Spinner'

export const LoadingPage = () => {
  return (
    <Stack className="not-found-page py-5" as="main">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100%' }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </Stack>
  )
}
