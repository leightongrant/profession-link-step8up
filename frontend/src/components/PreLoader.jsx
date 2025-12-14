import { ThreeDots } from 'react-loader-spinner'
import Stack from 'react-bootstrap/esm/Stack'
const PreLoader = () => {
  return (
    <Stack className="bg-transparent vh-100 align-items-center justify-content-center">
      <ThreeDots color="#7600ed" ariaLabel="content-loading" />
    </Stack>
  )
}

export default PreLoader
