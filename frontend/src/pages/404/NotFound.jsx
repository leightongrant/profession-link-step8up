import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom'
import { TbError404 } from "react-icons/tb";

export const NotFound = () => {
  return (
    <Stack className="not-found-page py-5" as="main">
      <Container>
        <h2 className="text-center mb-5">404</h2>
        <Row>
          <Col className="text-center">Page Not Found</Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center">The page you are looking for doesn't seem to exist. </div>
          </Col>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <TbError404 size="400px" aria-hidden="true" />
          </Col>
        </Row>
        <Row>
          <Link to="/profiles"><Button className="btn btn-primary mx-auto d-block mt-4">Go back to the profiles page</Button></Link>
        </Row>
      </Container>
    </Stack>
  )
}
