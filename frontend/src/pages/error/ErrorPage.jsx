import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

export const ErrorPage = () => {
  return (
    <Stack className="error-page py-5" as="main">
      <Container>
        <h2 className="text-center mb-5">Error</h2>
        <Row>
          <Col>Sorry, There was an error</Col>
        </Row>
      </Container>
    </Stack>
  )
}
