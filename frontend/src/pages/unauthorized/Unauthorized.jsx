import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom';
import { FaLock } from "react-icons/fa6";

export const UnauthorizedPage = () => {
  return (
    <Stack className="error-page py-5" as="main">
      <Container>
        <h2 className="text-center mb-5">Unauthorised</h2>
        <Row>
          <Col className="text-center">Sorry, you are not authorised to view this page.</Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <FaLock size="400px" aria-hidden="true" />
          </Col>
        </Row>
        <Row>
          <Link to="/profiles"><Button className="btn btn-primary mx-auto d-block mt-4">Go back to the profiles page</Button></Link>
        </Row>
      </Container>
    </Stack>
  )
}
