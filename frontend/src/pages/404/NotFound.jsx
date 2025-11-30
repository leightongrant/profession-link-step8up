import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

export const NotFound = () => {
  return (
    <Stack className="not-found-page py-5" as="main">
      <Container>
        <h2 className="text-center mb-5">404</h2>
        <Row>
          <Col>Page Not Found</Col>
        </Row>
      </Container>
    </Stack>
  )
}
